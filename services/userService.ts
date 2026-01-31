import { supabase } from '../lib/supabase'
import { UserProfile, UpdateUserProfileData } from '../types/user'

export const userService = {
  /**
   * Get user profile by ID
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        throw error
      }

      return data as UserProfile
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: UpdateUserProfileData
  ): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data as UserProfile
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  },

  /**
   * Get all users (admin only)
   */
  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return (data as UserProfile[]) || []
    } catch (error) {
      console.error('Error fetching all profiles:', error)
      return []
    }
  },

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    try {
      const profile = await this.getProfile(userId)
      return profile?.role === 'admin'
    } catch (error) {
      console.error('Error checking admin status:', error)
      return false
    }
  },

  /**
   * Approve user (admin only)
   */
  async approveUser(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_approved: true })
        .eq('id', userId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error approving user:', error)
      return false
    }
  },
}
