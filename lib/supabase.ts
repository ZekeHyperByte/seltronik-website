import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Product {
  id?: number
  name: string
  category: string
  description: string
  features: string[]
  specifications: {
    power?: string
    voltage?: string
    material?: string
    dimension?: string
    weight?: string
    certification?: string
  }
  image?: string
  catalog_url?: string
  created_at?: string
  updated_at?: string
}

export interface Project {
  id?: number
  title: string
  client: string
  location: string
  year: string
  category: string
  description: string
  scope: string[]
  images: string[]
  testimonial?: {
    text: string
    author: string
    position: string
  }
  stats?: {
    units?: number
    duration?: string
    value?: string
  }
  created_at?: string
  updated_at?: string
}

// Product CRUD Operations
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
  }
}

// Project CRUD Operations
export const projectService = {
  // Create
  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Read All
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Read by ID
  async getById(id: number) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Read by Category
  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Update
  async update(id: number, project: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...project, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete
  async delete(id: number) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Statistics
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
