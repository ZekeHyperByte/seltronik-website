import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect authenticated users away from auth pages
  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (session) {
      // User is already logged in, redirect to products
      return NextResponse.redirect(new URL('/produk', request.url))
    }
    return response
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (request.nextUrl.pathname === '/admin/login') {
      // If already logged in as admin, redirect to dashboard
      if (session) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role === 'admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
      }
      return response
    }

    // For other admin routes, require authentication
    if (!session) {
      // Not authenticated - redirect to admin login
      const redirectUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // Not an admin - redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}
