'use client'
import Link from 'next/link'
import { Experience } from '@/src/types'

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      href={`/experiences/${experience.id}`}
      className="block bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <img
        src={experience.image_url}
        alt={experience.title}
        className="w-full h-48 md:h-56 lg:h-40 object-cover"
      />
      <div className="p-4 md:p-4 ">

         <div className="mt-4 flex items-center justify-between">
              <h3 className="text-lg md:text-lg font-medium text-gray-900">{experience.title}</h3>

          <div className="text-sm text-black font-medium bg-secondary px-2 py-1 rounded-md"> {` ${experience.location} `}

          </div>

        </div>
        <p className="text-sm md:text-base text-gray-600 mt-2 line-clamp-2">{experience.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base md:text-sm font-semibold">From           <span className="text-base md:text-lg font-semibold">₹{experience.starting_price}</span>
          </span>
          <div className="text-sm text-black font-medium bg-primary px-2 py-1 rounded-md"> View details

          </div>

        </div>
      </div>
    </Link>
  )
}