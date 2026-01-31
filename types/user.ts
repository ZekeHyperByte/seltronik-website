export type UserRole = 'admin' | 'customer'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  phone?: string
  company_name?: string
  purpose_interest?: string
  role: UserRole
  is_approved: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateUserProfileData {
  full_name: string
  email: string
  phone?: string
  company_name?: string
  purpose_interest?: string
  password: string
}

export interface UpdateUserProfileData {
  full_name?: string
  phone?: string
  company_name?: string
  purpose_interest?: string
}
