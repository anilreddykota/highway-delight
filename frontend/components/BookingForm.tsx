'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Experience } from '@/src/types'

interface BookingFormProps {
  experience: Experience
}

export default function BookingForm({ experience }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const router = useRouter()

  const handleBooking = () => {
    if (!selectedSlot) return
    router.push(`/checkout?expId=${experience.id}&slotId=${selectedSlot}`)
  }

  const availableSlots = experience.slots?.filter(slot => 
    new Date(slot.date).toISOString().split('T')[0] === selectedDate
  ) || []

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">₹{experience.starting_price}</span>
        <span className="text-gray-600">per person</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {selectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    selectedSlot === slot.id
                      ? 'bg-primary text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {availableSlots.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-2">
                No slots available for this date
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleBooking}
        disabled={!selectedSlot}
        className="w-full py-3 bg-primary text-gray-900 font-semibold rounded-lg 
                 hover:bg-primary/90 transition-colors disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {selectedSlot ? 'Book Now' : 'Select a slot to continue'}
      </button>
    </div>
  )
}