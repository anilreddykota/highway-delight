import { Metadata } from 'next'
import { api } from '@/src/lib/api'
import ExperienceCard from '@/components/ExperienceCard'
import { Experience } from '@/src/types'

// Generate metadata for the page
export const metadata: Metadata = {
  title: 'Explore Experiences',
  description: 'Discover amazing travel experiences across India. Book local activities, cultural experiences, and adventures.',
  openGraph: {
    title: 'Explore Experiences - Highway Delite',
    description: 'Discover amazing travel experiences across India',
  }
}

// Server-side data fetching
async function getExperiences() {
  try {
    const res = await api.get('/experiences')
    return res.data
  } catch (error) {
    console.error('Failed to fetch experiences:', error)
    return []
  }
}

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Discover Amazing Experiences
      </h1>
      
      {experiences.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">No experiences found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience: Experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  )
}