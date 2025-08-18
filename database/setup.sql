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
    catalog_url TEXT,
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

-- Create Contact Messages Table (for future use)
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read certificates" ON certificates FOR SELECT USING (true);

-- Create policies for admin access (you'll need to set up authentication)
-- For now, we'll allow all operations (you should restrict this in production)
CREATE POLICY "Admin can manage products" ON products FOR ALL USING (true);
CREATE POLICY "Admin can manage projects" ON projects FOR ALL USING (true);
CREATE POLICY "Admin can manage certificates" ON certificates FOR ALL USING (true);
CREATE POLICY "Admin can manage contact messages" ON contact_messages FOR ALL USING (true);

-- Insert sample data for testing
INSERT INTO products (name, category, description, features, specifications, image, catalog_url) VALUES
(
    'SP-230D Pedestrian Light',
    'pedestrian',
    'Unit lampu pedestrian dengan green dynamic display, dilengkapi countdown timer dan suara untuk penyebrangan yang lebih aman.',
    '["LED High Brightness", "Countdown Timer Digital", "Audio Warning System", "Touchless Button", "Weather Resistant IP65"]'::jsonb,
    '{"power": "30 Watt", "voltage": "AC 220V", "material": "Aluminium Die Cast", "dimension": "300 x 300 x 120 mm", "weight": "5 kg", "certification": "SNI, CE"}'::jsonb,
    '/images/products/sp-230d.jpg',
    '/catalogs/pedestrian-sp230d.pdf'
),
(
    'Warning Light Solar WL-ST100',
    'warning',
    'Lampu peringatan tenaga surya dengan LED super bright, cocok untuk area konstruksi dan titik rawan kecelakaan.',
    '["Solar Powered", "Automatic Day/Night Sensor", "360° Visibility", "Flashing Modes", "Battery Backup 7 Days"]'::jsonb,
    '{"power": "10 Watt Solar Panel", "voltage": "DC 12V", "material": "Polycarbonate", "dimension": "200 x 200 x 150 mm", "weight": "2.5 kg", "certification": "SNI"}'::jsonb,
    '/images/products/wl-st100.jpg',
    '/catalogs/warning-wl-st100.pdf'
);

INSERT INTO projects (title, client, location, year, category, description, scope, images, testimonial, stats) VALUES
(
    'Tol Trans Jawa - Seksi 1',
    'PT. Jasa Marga (Persero) Tbk',
    'Jakarta - Cikampek',
    '2023',
    'highway',
    'Pemasangan sistem penerangan jalan dan rambu lalu lintas sepanjang 83 km untuk mendukung kelancaran Tol Trans Jawa.',
    '["Instalasi 500+ unit lampu jalan LED", "Pemasangan 200+ rambu lalu lintas", "Sistem warning light solar", "Maintenance 2 tahun"]'::jsonb,
    '["/images/projects/tol-trans-jawa-1.jpg", "/images/projects/tol-trans-jawa-2.jpg"]'::jsonb,
    '{"text": "Seltronik memberikan solusi terbaik dengan kualitas produk yang sangat baik. Tim profesional dan pengerjaan tepat waktu.", "author": "Ir. Budi Santoso", "position": "Project Manager - Jasa Marga"}'::jsonb,
    '{"units": 500, "duration": "6 bulan", "value": "Rp 15 Miliar"}'::jsonb
),
(
    'Smart City Bandung Phase 1',
    'Pemerintah Kota Bandung',
    'Bandung, Jawa Barat',
    '2023',
    'smartcity',
    'Implementasi sistem traffic light terintegrasi dengan IoT untuk monitoring real-time dan adaptive traffic control.',
    '["Instalasi 50 titik traffic light", "Sistem kontrol terpusat", "IoT sensors dan kamera", "Software monitoring dashboard"]'::jsonb,
    '["/images/projects/smart-city-1.jpg", "/images/projects/smart-city-2.jpg"]'::jsonb,
    '{"text": "Sistem yang diimplementasikan sangat membantu dalam mengurangi kemacetan dan meningkatkan keselamatan lalu lintas.", "author": "Drs. Ahmad Hidayat", "position": "Kepala Dishub Kota Bandung"}'::jsonb,
    '{"units": 50, "duration": "8 bulan", "value": "Rp 25 Miliar"}'::jsonb
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
