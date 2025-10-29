'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/Error'
import { Experience, Slot } from '@/src/types'
import { api } from '@/src/lib/api'

export default function ExperienceDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let mounted = true
    if (!id) return
    setLoading(true)
    api
      .get(`/experiences/${id}`)
      .then((res) => mounted && setExperience(res.data))
      .catch((err) => {
        console.error(err)
        mounted && setError('Failed to load experience')
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [id])

  const calculateTotal = () => {
    if (!experience) return 0
    const basePrice = experience.starting_price
    const subtotal = basePrice * quantity
    const tax = subtotal * 0.1 // 10% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><Loading /></div>
  if (error) return <div className="min-h-screen bg-gray-50"><Navbar /><ErrorMessage>{error}</ErrorMessage></div>
  if (!experience) return <div className="min-h-screen bg-gray-50"><Navbar /><ErrorMessage>No experience found</ErrorMessage></div>

  const { subtotal, tax, total } = calculateTotal()

  // Get unique dates from slots and format them
  const dates = Array.from(
    new Set(
      experience.slots.map(slot => {
        const date = new Date(slot.date)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
    )
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12">
        <div className="mb-4">
          <button onClick={() => router.push('/')} className="text-gray-600 hover:text-primary transition-colors font-bold">
            &larr; Details
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative">
              <img
                src={experience.image_url}
                className="w-full h-[381px] object-cover rounded-xl"
                alt={experience.title}
              />
            </div>

            {/* Title & Description */}
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900">{experience.title}</h1>
              <p className="mt-2 text-gray-600">{experience.location} </p>
              <p className="mt-4 text-gray-700">{experience.description}</p>
            </div>

            {/* Date Selection */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">ChooseDate</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-colors
                      ${selectedDate === date
                        ? 'bg-primary text-gray-900 border-primary'
                        : 'border-gray-300 hover:border-primary'}`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">ChooseTime</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {experience.slots
                .filter((slot) => {
                const slotDate = new Date(slot.date)
                const formattedDate = slotDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                return formattedDate === selectedDate
                })
                .map((slot) => {
                // Parse time string (HH:mm:ss) to create a display time
                const [hours, minutes] = slot.time.split(':')
                const timeString = new Date()
                timeString.setHours(parseInt(hours), parseInt(minutes))
                const spotsLeft = slot.capacity - slot.booked

                return (
                  <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={spotsLeft === 0}
                  className={` py-1 rounded-md border transition-colors relative d-flex
                    ${selectedSlot?.id === slot.id
                    ? 'bg-primary text-gray-900 border-primary'
                    : 'border-gray-300 hover:border-primary disabled:hover:border-gray-300 disabled:opacity-50'}`}
                  >
                  <div className="font-medium">
                    {timeString.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    <span className="text-sm mt-1 text-[#FF4C0A] px-2">
                    {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                    </span>
                  </div>

                  </button>
                )
                })
              }
              </div>
              <p className="text-sm text-gray-500 mt-2">All times are in IST (GMT+5:30)</p>
          
            </div>
            {/* About Section */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">About </h2>
              <div className="prose bg-gray-100 p-2 rounded-lg text-gray-700">
                {experience.description}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl p-6 bg-tertiary">

              {/* Price Info */}
              <div className="mb-6">
                <div className="grid grid-cols-2 text-gray-600">
                  <span className="text-left">Starts at </span>
                  <span className="text-right">₹{experience.starting_price}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-left text-gray-600">
                    Quantity
                  </label>
                  <div className="flex items-center gap-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-4 h-4  border border-gray-300 flex items-center justify-center hover:border-primary"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-4 h-4  border border-gray-300 flex items-center justify-center hover:border-primary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 text-gray-600">
                  <span className="text-left">Price </span>
                  <span className="text-right">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 text-gray-600">
                  <span className="text-left">Tax </span>
                  <span className="text-right">₹{tax.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 text-lg font-semibold border-t border-gray-200 pt-3">
                  <span className="text-left">Total</span>
                  <span className="text-right">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                disabled={!selectedSlot || !selectedDate}
                onClick={() => {
                  if (!selectedSlot) return
                  router.push(`/checkout?expId=${experience.id}&slotId=${selectedSlot.id}&quantity=${quantity}`)
                }}
                className="w-full py-3 px-4 bg-primary text-gray-900 rounded-lg font-medium 
                  hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedSlot && selectedDate ? 'Confirm' : 'Choose date and time'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}