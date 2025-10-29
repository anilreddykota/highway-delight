'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ResultPage() {
  const params = useSearchParams()
  const status = params.get('status')
  const bookingId = params.get('bookingId')
  const message = params.get('message')

  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        {status === 'success' ? (
          <div className="bg-white p-8 md:p-12 rounded-xl  text-center">
            <div className="w-16 h-16 bg-[#24ac39] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-[60px] h-[60px] text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed</h1>
            <p className="text-gray-600 mb-2">Thank you for booking with us</p>
            <div className=" rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Ref ID:               <span className="font-mono text-lg font-semibold">HIGH&{bookingId}DLI</span>
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/"
                className="bg-card rounded-lg px-4 py-2 inline-block"
              >
               Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Booking failed</h1>
            <p className="text-gray-600 mb-8">{message || 'Something went wrong with your booking'}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-gray-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try again
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}