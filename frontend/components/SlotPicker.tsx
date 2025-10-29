'use client'
import { Slot } from '@/src/types'

export default function SlotPicker({
  slots,
  onSelect,
  selectedId,
}: {
  slots: Slot[]
  onSelect: (s: Slot) => void
  selectedId?: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {slots?.map((slot) => {
        const soldOut = slot.booked >= slot.capacity
        const isSelected = selectedId === slot.id
        return (
          <button
            key={slot.id}
            disabled={soldOut}
            onClick={() => onSelect(slot)}
            className={`w-full text-left p-4 md:p-5 border-2 rounded-lg transition-all duration-300 ${
              soldOut 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                : isSelected 
                  ? 'border-primary bg-primary/10 shadow-md' 
                  : 'hover:shadow-md hover:border-primary/50 border-transparent bg-card'
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-base md:text-lg">
                  {new Date(slot.date).toLocaleDateString()} • {slot.time}
                </div>
                {/* <div className="text-sm md:text-base text-gray-600 mt-1">
                  ${slot.price && slot.price.toFixed(2)}
                </div> */}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                soldOut 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-white text-gray-600'
              }`}>
                {soldOut ? 'Sold out' : `${slot.capacity - slot.booked} spots left`}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}