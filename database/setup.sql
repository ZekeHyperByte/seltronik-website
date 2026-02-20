-- Supabase Database Setup for Seltronik Website
-- Run these commands in your Supabase SQL Editor

-- JWT secret is automatically managed by Supabase
-- No need to set it manually

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    image TEXT,
    mockup_image TEXT,
    real_image TEXT,
    catalog_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    purpose_interest TEXT,
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    scope JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    testimonial JSONB DEFAULT NULL,
    stats JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Certificates Table (for future use)
CREATE TABLE IF NOT EXISTS certificates (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    certificate_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    admin_notes TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Categories Table for product category management
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_image TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to make script idempotent)
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Public can read projects" ON projects;
DROP POLICY IF EXISTS "Public can read certificates" ON certificates;
DROP POLICY IF EXISTS "Public can read categories" ON categories;
DROP POLICY IF EXISTS "Admin can manage products" ON products;
DROP POLICY IF EXISTS "Admin can manage projects" ON projects;
DROP POLICY IF EXISTS "Admin can manage certificates" ON certificates;
DROP POLICY IF EXISTS "Admin can manage contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin can manage categories" ON categories;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;

-- Create policies for public read access
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);

-- Create policies for admin access
CREATE POLICY "Admin can manage products" ON products FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
CREATE POLICY "Admin can manage certificates" ON certificates FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
CREATE POLICY "Admin can manage contact messages" ON contact_messages FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);
CREATE POLICY "Admin can manage categories" ON categories FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- User profiles RLS policies
CREATE POLICY "Users can read own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Trigger function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'full_name', ''),
        COALESCE(new.raw_user_meta_data->>'role', 'customer')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists (to make script idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger to auto-create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default categories
INSERT INTO categories (id, name, description, thumbnail_image, display_order) VALUES
(
    'pedestrian',
    'Lampu Penyebrangan',
    'Sistem lampu penyebrangan pejalan kaki dengan teknologi terkini. Dilengkapi dengan countdown timer, audio warning, dan touchless button untuk keselamatan maksimal. Cocok untuk zebra cross, area sekolah, dan pusat perbelanjaan.',
    '/images/categories/PEDESTRIAN CROSSING SXC.jpg',
    1
),
(
    'traffic',
    'Traffic Light',
    'Lampu lalu lintas LED dengan kualitas terbaik. Tersedia dalam berbagai konfigurasi dan ukuran. Dilengkapi dengan sistem kontrol pintar dan kompatibel dengan berbagai controller.',
    '/images/categories/TRAFFIC LIGHT.jpg',
    2
),
(
    'street',
    'Alat Penerangan Jalan',
    'Lampu jalan LED hemat energi dengan berbagai wattage. Desain modern, tahan cuaca, dan mudah perawatan. Tersedia untuk jalan tol, jalan kota, dan area industri.',
    '/images/categories/ALAT PENERANGAN JALAN.jpg',
    3
),
(
    'warning',
    'Warning Light',
    'Lampu peringatan tenaga surya dan listrik untuk berbagai aplikasi. Tersedia dalam berbagai ukuran dan mode flashing. Ideal untuk area konstruksi, titik rawan kecelakaan, dan peringatan bahaya.',
    '/images/categories/WARNING LIGHT.jpg',
    4
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    thumbnail_image = EXCLUDED.thumbnail_image,
    display_order = EXCLUDED.display_order;

-- Insert sample data for testing
INSERT INTO products (name, category, description, features, specifications, image, catalog_url, is_featured) VALUES
(
    'SP-230D Pedestrian Light',
    'pedestrian',
    'Unit lampu pedestrian dengan green dynamic display, dilengkapi countdown timer dan suara untuk penyebrangan yang lebih aman.',
    '["LED High Brightness", "Countdown Timer Digital", "Audio Warning System", "Touchless Button", "Weather Resistant IP65"]'::jsonb,
    '{"power": "30 Watt", "voltage": "AC 220V", "material": "Aluminium Die Cast", "dimension": "300 x 300 x 120 mm", "weight": "5 kg", "certification": "SNI, CE"}'::jsonb,
    '/images/products/sp-230d.jpg',
    '/catalogs/pedestrian-sp230d.pdf',
    true
),
(
    'Warning Light Solar WL-ST100',
    'warning',
    'Lampu peringatan tenaga surya dengan LED super bright, cocok untuk area konstruksi dan titik rawan kecelakaan.',
    '["Solar Powered", "Automatic Day/Night Sensor", "360° Visibility", "Flashing Modes", "Battery Backup 7 Days"]'::jsonb,
    '{"power": "10 Watt Solar Panel", "voltage": "DC 12V", "material": "Polycarbonate", "dimension": "200 x 200 x 150 mm", "weight": "2.5 kg", "certification": "SNI"}'::jsonb,
    '/images/products/wl-st100.jpg',
    '/catalogs/warning-wl-st100.pdf',
    true
),
(
    'Traffic Light LED 300mm',
    'traffic',
    'Lampu lalu lintas LED 300mm dengan 3 aspek (merah, kuning, hijau). Kualitas premium dengan garansi 2 tahun.',
    '["High Brightness LED", "Low Power Consumption", "Long Lifespan 100,000 hours", "UV Resistant", "Easy Installation"]'::jsonb,
    '{"diameter": "300 mm", "voltage": "AC 220V", "power": "15 Watt per aspect", "material": "Polycarbonate", "warranty": "2 years"}'::jsonb,
    '/images/products/traffic-300mm.jpg',
    '/catalogs/traffic-300mm.pdf',
    true
),
(
    'Street Light LED 100W',
    'street',
    'Lampu jalan LED 100W dengan efisiensi tinggi. Cahaya terang dan merata untuk jalan tol dan jalan utama.',
    '["High Luminous Efficacy 130lm/W", "Die-cast Aluminum Body", "IP65 Waterproof", "Surge Protection", "5 Years Warranty"]'::jsonb,
    '{"power": "100 Watt", "lumen": "13,000 lm", "color_temperature": "5700K", "beam_angle": "120°", "input_voltage": "AC 100-277V"}'::jsonb,
    '/images/products/street-100w.jpg',
    '/catalogs/street-100w.pdf',
    true
)
ON CONFLICT DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing update triggers if they exist (to make script idempotent)
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Data Migration: Copy existing images to new fields (only if columns exist)
DO $$
BEGIN
    -- Check if mockup_image column exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'mockup_image'
    ) THEN
        -- Only update if the column exists
        UPDATE products
        SET mockup_image = image, real_image = image
        WHERE mockup_image IS NULL OR real_image IS NULL;
    END IF;
END $$;

-- Remove controller category products (only if table exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'products'
    ) THEN
        DELETE FROM products WHERE category = 'controller';
    END IF;
END $$;

-- Note: To create an admin user, you need to:
-- 1. Sign up a user through the auth system (via /auth/register or Supabase dashboard)
-- 2. Then run this SQL to make them admin:
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
-- 
-- Or create admin directly via Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add user" or invite user
-- 3. Set email and password
-- 4. Then run: UPDATE user_profiles SET role = 'admin' WHERE email = 'admin@seltronik.com';
