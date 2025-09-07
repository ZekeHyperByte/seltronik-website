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