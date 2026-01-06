import { supabase } from '../lib/supabase';

export const statsService = {
  async getDashboardStats() {
    const productsResult = await supabase.from('products').select('id', { count: 'exact' })

    return {
      products: productsResult.count || 0,
      certificates: 8, // Static for now
      messages: 12 // Static for now
    }
  }
}