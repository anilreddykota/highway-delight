'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Experience, Slot } from '@/src/types'

interface ExperienceBookingProps {
  experience: Experience
}

export default function ExperienceBooking({ experience }: ExperienceBookingProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot)
  }

  const handleBookNow = () => {
    if (selectedSlot) {
      router.push(`/checkout?expId=${experience.id}&slotId=${selectedSlot.id}`)
    }
  }

  // Group slots by date
  const slotsByDate = experience.slots.reduce((acc: { [key: string]: Slot[] }, slot) => {
    const date = new Date(slot.date).toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(slot)
    return acc
  }, {})

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">₹{experience.starting_price}</h2>
        <p className="text-gray-600">per person</p>
      </div>

      <div className="space-y-4">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(slotsByDate).map(date => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`p-2 text-sm rounded-lg border ${
                  selectedDate === date 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-gray-200 hover:border-primary'
                }`}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Times
            </label>
            <div className="grid grid-cols-2 gap-2">
              {slotsByDate[selectedDate]?.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-2 text-sm rounded-lg border ${
                    selectedSlot?.id === slot.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleBookNow}
        disabled={!selectedSlot}
        className="w-full mt-6 py-3 bg-primary text-gray-900 font-semibold rounded-lg 
                 hover:bg-primary/90 transition-colors disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {selectedSlot ? 'Book Now' : 'Select a date and time'}
      </button>
    </div>
  )
}