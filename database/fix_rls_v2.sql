-- Drop the existing policies
DROP POLICY IF EXISTS "Anon can manage products" ON products;
DROP POLICY IF EXISTS "Anon can manage projects" ON projects;
DROP POLICY IF EXISTS "Anon can manage certificates" ON certificates;

-- Create new policies that allow all operations for anonymous users
CREATE POLICY "Anon can manage products" ON products FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can manage projects" ON projects FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon can manage certificates" ON certificates FOR ALL TO anon USING (true) WITH CHECK (true);
