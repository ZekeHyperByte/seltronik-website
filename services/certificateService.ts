import { supabase } from '../lib/supabase';
import type { Certificate } from '../types/certificate';

export const certificateService = {
  // Create
  async create(certificate: Omit<Certificate, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('certificates')
      .insert([certificate])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Read All
  async getAll() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Read by ID
  async getById(id: number) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update
  async update(id: number, certificate: Partial<Certificate>) {
    const { data, error } = await supabase
      .from('certificates')
      .update({ ...certificate, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete
  async delete(id: number) {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};