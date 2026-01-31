# Supabase Database Setup Instructions

This guide will help you set up Supabase database for the Seltronik website.

## 1. Create Supabase Account and Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `seltronik-website`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Configure Environment Variables

1. Edit `.env.local` in your project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## 4. Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `database/setup.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the script

This will create:
- `products` table for managing products
- `categories` table for product categories
- `user_profiles` table for user management
- `contact_messages` table for contact form submissions
- `projects` table for company projects
- `certificates` table for certifications
- Proper indexes for performance
- Row Level Security policies
- Sample data for testing

## 5. Create Admin User

After running the setup script, you need to create an admin user:

### Option 1: Via Supabase Dashboard (Recommended)
1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **"Add user"** or **"Invite user"**
3. Enter admin email and password
4. After creating the user, go to **Table Editor** → **user_profiles**
5. Find the user you just created and change the `role` column to `admin`

### Option 2: Via Website Registration
1. Register a new user at `/auth/register`
2. Go to **Table Editor** → **user_profiles** in Supabase dashboard
3. Find the user and change the `role` column to `admin`

## 6. Add Category Images

Place your category thumbnail images (2448x3264 pixels) in:
```
public/images/categories/
├── PEDESTRIAN CROSSING SXC.jpg
├── TRAFFIC LIGHT.jpg
├── ALAT PENERANGAN JALAN.jpg
└── WARNING LIGHT.jpg
```

**Important**: Use the exact filenames shown above (case-sensitive).

## 7. Verify Database Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see these tables:
   - `products`
   - `categories`
   - `user_profiles`
   - `contact_messages`
   - `projects`
   - `certificates`
3. Check that `categories` table has 4 default categories
4. Check that `products` table has sample data

## 8. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test public product page (category view):
   - Go to `http://localhost:3000/produk`
   - You should see 4 category cards

3. Test admin login:
   - Go to `http://localhost:3000/admin/login`
   - Login with your admin email and password
   - You should see the admin dashboard

4. Test contact form:
   - Go to `http://localhost:3000/kontak`
   - Submit a test message
   - Check admin dashboard for the message

## 9. Database Schema Overview

### Products Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- name (VARCHAR(255)) - Product name
- category (VARCHAR(100)) - Product category
- description (TEXT) - Product description
- features (JSONB) - Array of product features
- specifications (JSONB) - Object with technical specs
- image (TEXT) - Product image URL
- mockup_image (TEXT) - Blurred/mockup image for public view
- real_image (TEXT) - Real product image for customers
- catalog_url (TEXT) - Product catalog PDF URL
- is_featured (BOOLEAN) - Featured product flag
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Categories Table
```sql
- id (VARCHAR(100) PRIMARY KEY)
- name (VARCHAR(255)) - Category name
- description (TEXT) - Category description
- thumbnail_image (TEXT) - Category thumbnail URL
- display_order (INTEGER) - Display order
- is_active (BOOLEAN) - Active status
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### User Profiles Table
```sql
- id (UUID PRIMARY KEY) - References auth.users
- full_name (VARCHAR(255)) - User's full name
- email (VARCHAR(255)) - User's email
- phone (VARCHAR(50)) - Contact phone number
- company_name (VARCHAR(255)) - Company/organization name
- purpose_interest (TEXT) - Purpose of registration
- role (VARCHAR(50)) - Either 'admin' or 'customer'
- is_approved (BOOLEAN) - Approval status
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Contact Messages Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- name (VARCHAR(255)) - Sender name
- email (VARCHAR(255)) - Sender email
- phone (VARCHAR(50)) - Sender phone
- company (VARCHAR(255)) - Sender company
- subject (VARCHAR(255)) - Message subject
- message (TEXT) - Message content
- status (VARCHAR(50)) - unread/read/replied/archived
- admin_notes (TEXT) - Internal admin notes
- replied_at (TIMESTAMP) - When message was replied
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 10. Security Notes

### Row Level Security (RLS)
- All tables have RLS enabled
- Public read access for products and categories (for website display)
- Only admins can write to products, categories, and contact_messages
- Users can only read/update their own profile

### Authentication Flow
1. **Admin Login**: Uses Supabase Auth at `/admin/login`
2. **Customer Login**: Uses Supabase Auth at `/auth/login`
3. **Middleware Protection**: Admin routes are protected by middleware

## 11. Features Overview

### Public Website (Non-Authenticated)
- View 4 product category cards
- Click category to see description
- Prompt to register/login for full access

### Customer View (Authenticated)
- View full product catalog
- See product details, specifications, features
- Download product catalogs
- Contact sales team

### Admin Dashboard
- Manage products (CRUD)
- Manage contact messages with status tracking
- View statistics
- Manage categories

## 12. Troubleshooting

### Common Issues

**Connection Error:**
- Check if environment variables are correct
- Verify Supabase project is active
- Check network connectivity

**Permission Denied:**
- Verify RLS policies are set correctly
- Check if user has proper role (admin/customer)

**Admin Cannot Login:**
- Verify user exists in auth.users
- Check user_profiles.role is set to 'admin'
- Check middleware is configured correctly

**Contact Form Not Saving:**
- Verify contact_messages table exists
- Check RLS policies allow insert for public

### Getting Help
- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Join Supabase Discord for community support
- Check GitHub issues for common problems

## 13. Next Steps

After successful setup:
1. Add your category images to `public/images/categories/`
2. Add product images to `public/images/products/`
3. Add product catalogs to `public/catalogs/`
4. Test all features (admin, customer, contact form)
5. Set up email notifications (optional)
6. Configure automated backups
7. Monitor performance and optimize queries

Your Seltronik website is now ready!
