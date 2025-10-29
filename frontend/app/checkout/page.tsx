'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/Error'
import { api } from '@/src/lib/api'
import { Experience } from '@/src/types'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const expId = searchParams.get('expId') || ''
  const slotId = searchParams.get('slotId') || ''
  console.log('Checkout params:', { expId, slotId })

  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [promo, setPromo] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    let mounted = true
    if (!expId) {
      setError('Missing experience id')
      setLoading(false)
      return
    }
    api
      .get(`/experiences/${expId}`)
      .then((res) => mounted && setExperience(res.data))
      .catch((err) => {
        console.error(err)
        mounted && setError('Failed to load experience')
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [expId])

  const selectedSlot = experience?.slots.find((s) => s.id == parseInt(slotId))

  async function validatePromo() {
    if (!promo) return
    try {
      const res = await api.post('/promo/validate', { code: promo })
      if (res.data?.valid) {
        setPromoDiscount(parseInt(res.data.discount) || 0)
        alert(`Promo code applied! You saved ₹${parseInt(res.data.discount) || 0}`)
      } else {
        setPromoDiscount(0)
        alert('Invalid promo code')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to validate promo')
    }
  }

  const price: number = selectedSlot && experience?.starting_price ? parseInt(experience.starting_price.toString()) : 0
  const finalPrice = Math.max(0, price - promoDiscount)

  async function submitBooking() {
    if (!name || !email) {
      alert('Please provide name and a valid email')
      return
    }
    // terms and conditions checkbox can be validated here
    if (!termsAccepted) {
      alert('You must accept the terms and conditions to proceed')
      return
    }


    if (!selectedSlot || !experience) {
      alert('Please select a slot')
      return
    }
    setSubmitting(true)
    try {
      // Calculate final price including tax
      const totalPrice = parseFloat((finalPrice + finalPrice * 0.05).toFixed(2))

      const payload = {
        experience_id: parseInt(experience?.id?.toString() || '0'),
        slot_id: parseInt(selectedSlot?.id?.toString() || '0'),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        total_price: totalPrice,
        promo_code: promo.trim() || undefined
      }
      const res = await api.post('/bookings', payload)
      if (res.data?.success) {
        router.push(`/result?status=success&bookingId=${res.data.bookingId}`)
      } else {
        router.push(`/result?status=failure&message=${encodeURIComponent(res.data.message || 'Booking failed')}`)
      }
    } catch (err: any) {
      console.error(err)
      router.push(`/result?status=failure&message=${encodeURIComponent(err?.message || 'Booking failed')}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><Loading /></div>
  if (error) return <div className="min-h-screen bg-gray-50"><Navbar /><ErrorMessage>{error}</ErrorMessage></div>
  if (!experience) return <div className="min-h-screen bg-gray-50"><Navbar /><ErrorMessage>No experience found</ErrorMessage></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3 md:py-2">
           <div className="mb-4">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-primary transition-colors font-bold">
            &larr; Details
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Column - User Input Form  2 parts */}
          <div className="bg-card rounded-xl p-4 md:p-6 lg:col-span-2 h-fit">
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Full name</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg bg-[#dddddd] focus:border-primary outline-none transition-colors" 
                    placeholder="Full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    className="w-full px-4 py-3 rounded-lg bg-[#dddddd] focus:border-primary outline-none transition-colors" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <input 
                  className="flex-1 px-4 py-3 rounded-lg bg-[#dddddd] focus:border-primary outline-none transition-colors" 
                  placeholder="Promo code" 
                  value={promo} 
                  onChange={(e) => setPromo(e.target.value)} 
                />
                <button 
                  onClick={validatePromo} 
                  className="px-6 py-3 bg-black  text-white font-medium rounded-lg "
                  disabled={promoDiscount>0}
                >
                  Apply
                </button>
              </div>

              <div className="flex items-start gap-3 ">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 bg-[#dddddd]"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the terms and conditions and acknowledge the safety policy for this experience.
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="bg-tertiary rounded-lg overflow-hidden lg:col-span-1">
         

            <div className="p-6 space-y-2">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Experience</span>
                  <span className='font-semibold'>{experience.title}</span>
                </div>
                {selectedSlot && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Date</span>
                      <span className='font-semibold'>{new Date(selectedSlot.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Time</span>
                      <span className='font-semibold'>{selectedSlot.time}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Qty</span>
                  <span className='font-semibold'>1</span>
                </div>
              </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className='font-semibold'>₹{price && price.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Promo Code</span>
                      <span className="font-semibold">{promo}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span className='font-semibold'>₹{(finalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className='font-semibold'>₹{(finalPrice + finalPrice * 0.05).toFixed(2)}</span>
                </div>
                     <button 
                disabled={submitting} 
                onClick={submitBooking} 
                className="w-full py-2 bg-primary text-gray-900  rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {submitting ? 'Processing...' : 'Pay and Confirm'}
              </button>
              </div>

         
          </div>
        </div>
      </main>
    </div>
  )
}