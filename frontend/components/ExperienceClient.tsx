'use client'
import { useState, useEffect } from 'react'
import { Experience } from '@/src/types'
import { api } from '@/src/lib/api'
import Image from 'next/image'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/Error'
import ExperienceBooking from '@/components/ExperienceBooking'

interface ExperienceClientProps {
  initialData?: Experience
  experienceId: string
}

export default function ExperienceClient({ initialData, experienceId }: ExperienceClientProps) {
  const [experience, setExperience] = useState<Experience | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialData) {
      api.get(`/experiences/${experienceId}`)
        .then(res => setExperience(res.data))
        .catch(err => setError('Failed to load experience'))
        .finally(() => setLoading(false))
    }
  }, [experienceId, initialData])

  if (loading) return <Loading />
  if (error) return <ErrorMessage>{error}</ErrorMessage>
  if (!experience) return <ErrorMessage>Experience not found</ErrorMessage>

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Experience Details */}
      <div className="space-y-6">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={experience.image_url}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">{experience.title}</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600">{experience.description}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">What to expect</h2>
          <div className="space-y-3">
            {experience.highlights?.map((highlight: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Booking Widget */}
      <div className="lg:sticky lg:top-24 h-fit">
        <ExperienceBooking experience={experience} />
      </div>
    </div>
  )
}