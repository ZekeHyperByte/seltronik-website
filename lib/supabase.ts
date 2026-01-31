import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Backward compatibility exports - re-export from new structure
export type { Product } from '../types/product'
export type { Certificate } from '../types/certificate'
export type { Category } from '../services/categoryService'
export type { ContactMessage, ContactStats } from '../services/contactService'

export { productService } from '../services/productService'
export { certificateService } from '../services/certificateService'
export { storageService } from '../services/storageService'
export { statsService } from '../services/statsService'
export { categoryService } from '../services/categoryService'
export { contactService } from '../services/contactService'
