import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { UserProfile } from '../types/user'
import { userService } from '../services/userService'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await userService.getProfile(userId)
      setProfile(userProfile)
    } catch (error) {
      console.error('Error loading user profile:', error)
      setProfile(null)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  useEffect(() => {
    // Check active sessions and set the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
