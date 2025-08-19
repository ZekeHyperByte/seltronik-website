-- Drop the existing admin policies
DROP POLICY "Admin can manage products" ON products;
DROP POLICY "Admin can manage projects" ON projects;

-- Create new policies that allow anonymous users to manage products and projects
CREATE POLICY "Anon can manage products" ON products FOR ALL TO anon USING (true);
CREATE POLICY "Anon can manage projects" ON projects FOR ALL TO anon USING (true);
