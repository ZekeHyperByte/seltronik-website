import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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

// Certificate Types
export interface Certificate {
  id?: number;
  name: string;
  category: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  certificate_url: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

// Certificate CRUD Operations
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

// Storage
export const storageService = {
  async uploadFile(file: File) {
    const fileExt = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('seltronik-assets')
      .upload(`public/${uniqueFileName}`, file);

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('seltronik-assets')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  },

  async deleteFile(fileUrl: string) {
    try {
      const url = new URL(fileUrl);
      const filePath = url.pathname.split('/seltronik-assets/')[1];
      
      if (!filePath) {
        console.warn('Could not determine file path from URL:', fileUrl);
        return;
      }

      const { error } = await supabase.storage
        .from('seltronik-assets')
        .remove([filePath]);

      if (error) {
        // It's okay if the file doesn't exist, so we can ignore 'Not Found' errors
        if (error.message !== 'Not Found') {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // We don't re-throw here to avoid stopping the entire update process
      // if a file deletion fails for some reason (e.g., permissions, already deleted).
    }
  }
};

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
