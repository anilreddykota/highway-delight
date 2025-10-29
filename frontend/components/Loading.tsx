'use client'
export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  )
}