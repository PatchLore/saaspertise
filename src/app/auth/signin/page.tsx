'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader } from 'lucide-react'

export const dynamic = 'force-dynamic'

function SignInForm() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const urlMessage = searchParams.get('message')
    if (urlMessage) setMessage(urlMessage)
  }, [searchParams])

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)
    try {
      const res = await signIn('email', { email, redirect: true, callbackUrl: '/dashboard' })
      if (res?.error) setError('We had trouble sending your email. Please try again or contact support.')
      else setMessage("We've sent a secure sign-in link to your email. Click the link to access your dashboard.")
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Access your consultant dashboard</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">{error}</div>
          )}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-4">{message}</div>
          )}

          <form className="space-y-4" onSubmit={handleMagicLink}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 flex gap-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@company.com"
                />
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Send magic link'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}




