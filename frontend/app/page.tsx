 'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import ExperienceCard from '@/components/ExperienceCard'
import Loading from '@/components/Loading'
import { Experience } from '@/src/types'
import { api } from '@/src/lib/api'

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api
      .get('/experiences')
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
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12">
   

        {loading && <Loading />}
        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </main>
    </div>
  )
}