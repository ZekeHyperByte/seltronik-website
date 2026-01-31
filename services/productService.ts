import { supabase } from '../lib/supabase';
import type { Product } from '../types/product';

export const productService = {
  // Create
  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Read All
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Read Featured
  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('updated_at', { ascending: false })
      .limit(5)
    
    if (error) throw error
    return data
  },

  // Read by ID
  async getById(id: number) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Read by Category
  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Update
  async update(id: number, product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...product, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete
  async delete(id: number) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },

  // Get products for user (with content gating)
  async getProductsForUser(userId?: string) {
    const products = await this.getAll()

    if (!userId) {
      // Return restricted content for non-authenticated users
      return products.map(product => ({
        ...product,
        description: product.description.substring(0, 100) + (product.description.length > 100 ? '...' : ''),
        features: product.features.slice(0, 3),
        specifications: {}, // Hide specs
        image: product.mockup_image || product.image, // Show mockup
        catalog_url: '', // Hide catalog
      }))
    }

    // Return full content for authenticated users with real images
    return products.map(product => ({
      ...product,
      image: product.real_image || product.image, // Show real image
    }))
  },

  // Get product by ID for user (with content gating)
  async getProductForUser(productId: number, userId?: string) {
    const product = await this.getById(productId)

    if (!userId) {
      // Return restricted content for non-authenticated users
      return {
        ...product,
        description: product.description.substring(0, 100) + (product.description.length > 100 ? '...' : ''),
        features: product.features.slice(0, 3),
        specifications: {}, // Hide specs
        image: product.mockup_image || product.image, // Show mockup
        catalog_url: '', // Hide catalog
      }
    }

    // Return full content for authenticated users with real images
    return {
      ...product,
      image: product.real_image || product.image, // Show real image
    }
  },

  // Get products by category for user (with content gating)
  async getProductsByCategoryForUser(category: string, userId?: string) {
    const products = await this.getByCategory(category)

    if (!userId) {
      // Return restricted content for non-authenticated users
      return products.map(product => ({
        ...product,
        description: product.description.substring(0, 100) + (product.description.length > 100 ? '...' : ''),
        features: product.features.slice(0, 3),
        specifications: {}, // Hide specs
        image: product.mockup_image || product.image, // Show mockup
        catalog_url: '', // Hide catalog
      }))
    }

    // Return full content for authenticated users with real images
    return products.map(product => ({
      ...product,
      image: product.real_image || product.image, // Show real image
    }))
  }
}