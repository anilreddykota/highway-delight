'use client'
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <div className="text-red-600 py-4">{children}</div>
}