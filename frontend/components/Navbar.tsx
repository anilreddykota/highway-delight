'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false)
      }
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <nav className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            <Image src="/logo.png" alt="Logo" width={100} height={40} priority />
          </Link>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="search"
              placeholder="Search experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[340px] h-[42px] px-4 py-3 rounded-md bg-gray-100 focus:outline-none border border-transparent focus:border-primary"
            />
            <button
              type="submit"
              onClick={handleSearch}
              className="h-[42px] px-4 bg-primary text-gray-900 rounded hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div
        className={`fixed left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-40 md:hidden ${
          isSearchOpen ? 'top-20' : '-top-20'
        }`}
      >
        <form onSubmit={handleSearch} className="p-4 flex gap-2">
          <input
            type="search"
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-[42px] px-4 py-3 rounded-md bg-gray-100 focus:outline-none border border-transparent focus:border-primary"
          />
          <button
            type="submit"
            className="h-[42px] px-4 bg-primary text-gray-900 rounded hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </form>
      </div>
    </>
  )
  
}