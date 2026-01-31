import { supabase } from '../lib/supabase';

export interface Category {
  id: string;
  name: string;
  description: string;
  thumbnail_image?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const categoryService = {
  // Get all active categories ordered by display_order
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get category by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create category (admin only)
  async create(category: Omit<Category, 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update category (admin only)
  async update(id: string, category: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update({ ...category, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete category (admin only)
  async delete(id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
