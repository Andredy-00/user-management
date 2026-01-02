'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null
  url: string | null
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path)

        if (error) throw error

        const objectUrl = URL.createObjectURL(data)
        setAvatarUrl(objectUrl)
      } catch (error) {
        console.error('Error downloading image:', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar */}
      <div
        className="relative overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 shadow-sm"
        style={{ width: size, height: size }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}

        {/* Overlay */}
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 text-sm font-medium text-white opacity-0 transition hover:opacity-100"
        >
          {uploading ? 'Uploading…' : 'Change'}
        </label>
      </div>

      {/* Hidden input */}
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />

      {/* Helper text */}
      <p className="text-xs text-neutral-500">
        JPG, PNG or WEBP
      </p>
    </div>
  )
}
