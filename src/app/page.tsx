// app/page.tsx or app/page.jsx
"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to the Auth Project</h1>
      <p className="text-lg mb-8 text-gray-300 text-center">
        This is a learning project for authentication using Next.js, Tailwind, and APIs.
      </p>

      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
          Login
        </Link>
        <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
          Signup
        </Link>
      </div>
    </div>
  )
}
