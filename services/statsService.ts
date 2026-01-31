import { supabase } from '../lib/supabase';

export const statsService = {
  async getDashboardStats() {
    const [productsResult, messagesResult] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('contact_messages').select('id', { count: 'exact' })
    ]);

    return {
      products: productsResult.count || 0,
      messages: messagesResult.count || 0
    };
  }
};
