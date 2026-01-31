import { supabase } from '../lib/supabase'
import { SignUpData, SignInData, AuthError } from '../types/auth'

export const authService = {
  /**
   * Sign up a new user (Potential Buyer)
   */
  async signUp(data: SignUpData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone || '',
            company_name: data.company_name || '',
            purpose_interest: data.purpose_interest || '',
          },
        },
      })

      if (authError) {
        throw authError
      }

      // Update user profile with additional fields
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({
            phone: data.phone,
            company_name: data.company_name,
            purpose_interest: data.purpose_interest,
          })
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('Error updating profile:', profileError)
        }
      }

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to sign up',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Sign in an existing user (Admin or Potential Buyer)
   */
  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        throw error
      }

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to sign in',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to sign out',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Get the current session
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        throw error
      }
      return data.session
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to get session',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Get the current user
   */
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        throw error
      }
      return data.user
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to get user',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Reset password
   */
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) {
        throw error
      }
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to reset password',
        status: error.status,
      }
      throw authError
    }
  },

  /**
   * Update password
   */
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (error) {
        throw error
      }
    } catch (error: any) {
      const authError: AuthError = {
        message: error.message || 'Failed to update password',
        status: error.status,
      }
      throw authError
    }
  },
}
