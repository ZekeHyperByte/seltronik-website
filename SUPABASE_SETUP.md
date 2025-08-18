# Supabase Database Setup Instructions

This guide will help you set up Supabase database for the Seltronik website admin panel.

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

1. In your project root, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=seltronik2024
   ```

## 4. Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `database/setup.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the script

This will create:
- `products` table for managing products
- `projects` table for managing projects
- `certificates` table (for future use)
- `contact_messages` table (for future use)
- Proper indexes for performance
- Row Level Security policies
- Sample data for testing

## 5. Verify Database Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see 4 tables: `products`, `projects`, `certificates`, `contact_messages`
3. Check that `products` and `projects` tables have sample data

## 6. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin/login`
3. Login with:
   - Username: `admin`
   - Password: `seltronik2024`

4. You should see the dashboard with real data from Supabase

## 7. Database Schema Overview

### Products Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- name (VARCHAR(255)) - Product name
- category (VARCHAR(100)) - Product category
- description (TEXT) - Product description
- features (JSONB) - Array of product features
- specifications (JSONB) - Object with technical specs
- image (TEXT) - Product image URL
- catalog_url (TEXT) - Product catalog PDF URL
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Projects Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- title (VARCHAR(255)) - Project title
- client (VARCHAR(255)) - Client name
- location (VARCHAR(255)) - Project location
- year (VARCHAR(4)) - Project year
- category (VARCHAR(100)) - Project category
- description (TEXT) - Project description
- scope (JSONB) - Array of project scope items
- images (JSONB) - Array of project image URLs
- testimonial (JSONB) - Client testimonial object
- stats (JSONB) - Project statistics object
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 8. Security Notes

### Row Level Security (RLS)
- All tables have RLS enabled
- Public read access for products and projects (for website display)
- Admin access for all operations (currently open - should be restricted in production)

### Production Security Recommendations
1. Set up proper authentication with Supabase Auth
2. Create specific policies for admin users
3. Use service role key for admin operations
4. Enable email confirmation for admin accounts
5. Set up proper CORS policies

## 9. Backup and Maintenance

### Regular Backups
1. Go to **Settings** → **Database**
2. Use the backup feature for regular backups
3. Consider setting up automated backups

### Monitoring
1. Monitor database usage in **Settings** → **Usage**
2. Set up alerts for high usage
3. Monitor slow queries in **Logs**

## 10. Troubleshooting

### Common Issues

**Connection Error:**
- Check if environment variables are correct
- Verify Supabase project is active
- Check network connectivity

**Permission Denied:**
- Verify RLS policies are set correctly
- Check if anon key has proper permissions

**Data Not Showing:**
- Verify tables were created successfully
- Check if sample data was inserted
- Verify API calls in browser network tab

### Getting Help
- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Join Supabase Discord for community support
- Check GitHub issues for common problems

## 11. Next Steps

After successful setup:
1. Test all CRUD operations in the admin panel
2. Add more sample data through the admin interface
3. Customize the database schema as needed
4. Set up proper authentication for production
5. Configure automated backups
6. Monitor performance and optimize queries

Your Supabase database is now ready for the Seltronik website admin panel!
