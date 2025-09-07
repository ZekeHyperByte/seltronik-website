import { supabase } from '../lib/supabase';

export const statsService = {
  async getDashboardStats() {
    const [productsResult, projectsResult] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('projects').select('id', { count: 'exact' })
    ])

    return {
      products: productsResult.count || 0,
      projects: projectsResult.count || 0,
      certificates: 8, // Static for now
      messages: 12 // Static for now
    }
  }
}