'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-neutral-900">
        Account settings
      </h2>

      <div className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            type="text"
            value={user?.email}
            disabled
            className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm text-neutral-500"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Full name
          </label>
          <input
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        {/* Username */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Username
          </label>
          <input
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Website
          </label>
          <input
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        {/* Update button */}
        <button
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Update profile'}
        </button>

        {/* Sign out */}
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
