import { User } from '@supabase/supabase-js'
import { UserProfile } from './user'

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
}

export interface SignUpData {
  email: string
  password: string
  full_name: string
  phone?: string
  company_name?: string
  purpose_interest?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthError {
  message: string
  status?: number
}
