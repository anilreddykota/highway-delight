    'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ExperienceCard from '@/components/ExperienceCard'
import Loading from '@/components/Loading'
import { Experience } from '@/src/types'
import { api } from '@/src/lib/api'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    
    if (!searchQuery.trim()) {
      setExperiences([])
      setLoading(false)
      return
    }

    api
      .get(`/experiences?search=${encodeURIComponent(searchQuery)}`)
      .then((res) => {
        if (mounted) setExperiences(res.data)
      })
      .catch((err) => {
        console.error(err)
        if (mounted) setError('Failed to load experiences')
      })
      .finally(() => mounted && setLoading(false))
    
    return () => {
      mounted = false
    }
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {searchQuery && (
            <p className="text-lg text-gray-600">
              Showing results for "{searchQuery}"
            </p>
          )}
        </div>

        {loading && <Loading />}
        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No experiences found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search terms or explore our featured experiences
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </main>
    </div>
  )
}