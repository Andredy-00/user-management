'use client'

import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon / visual */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white">
          <span className="text-2xl font-semibold">!</span>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mb-8 text-sm text-neutral-600">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Go home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  )
}
