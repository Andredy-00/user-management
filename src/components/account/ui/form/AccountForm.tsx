'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import { error } from 'console'

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
      if (error) {
        if(error.message.includes('profiles_username_key')){
          alert("El usuario que ingresaste ya esta en uso")
          return
        }
        throw error
      }
      alert('Profile updated!')
    } catch {
      alert('Error updating the data!' )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-neutral-200 px-8 py-6">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          Account
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your personal information
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 px-8 py-6">
        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            type="text"
            value={user?.email}
            disabled
            className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Full name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Full name
            </label>
            <input
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Username
            </label>
            <input
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Website
          </label>
          <input
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 px-8 py-5">
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
          >
            Sign out
          </button>
        </form>

        <button
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
          className="inline-flex items-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
