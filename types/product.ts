export interface Product {
  id?: number
  name: string
  category: string
  description: string
  features: string[]
  specifications: Record<string, string>
  image?: string
  mockup_image?: string
  real_image?: string
  catalog_url?: string
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}