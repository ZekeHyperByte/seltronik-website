import { supabase } from '../lib/supabase';

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read' | 'replied' | 'archived';
  admin_notes?: string;
  replied_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
  archived: number;
}

export const contactService = {
  // Create new contact message
  async create(message: Omit<ContactMessage, 'id' | 'status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...message,
        status: 'unread'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all messages (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get messages by status (admin only)
  async getByStatus(status: ContactMessage['status']) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get message by ID (admin only)
  async getById(id: number) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update message status (admin only)
  async updateStatus(id: number, status: ContactMessage['status'], adminNotes?: string) {
    const updateData: Partial<ContactMessage> = { 
      status,
      updated_at: new Date().toISOString()
    };

    if (status === 'replied') {
      updateData.replied_at = new Date().toISOString();
    }

    if (adminNotes !== undefined) {
      updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Mark as read (admin only)
  async markAsRead(id: number) {
    return this.updateStatus(id, 'read');
  },

  // Delete message (admin only)
  async delete(id: number) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Get contact statistics (admin only)
  async getStats(): Promise<ContactStats> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('status');
    
    if (error) throw error;

    const stats: ContactStats = {
      total: data?.length || 0,
      unread: 0,
      read: 0,
      replied: 0,
      archived: 0
    };

    data?.forEach((msg: { status: keyof ContactStats }) => {
      if (msg.status === 'unread') stats.unread++;
      else if (msg.status === 'read') stats.read++;
      else if (msg.status === 'replied') stats.replied++;
      else if (msg.status === 'archived') stats.archived++;
    });

    return stats;
  }
};
