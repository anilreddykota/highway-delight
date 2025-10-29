import db from '../config/database';
import { Booking } from '../types';

export const BookingService = {
  async create(booking: Omit<Booking, 'id' | 'status' | 'created_at'>): Promise<Booking> {
    // Start a transaction
    const client = await db.connect();
    
    try {
      await client.query('BEGIN');

      // Check slot availability
      const slotResult = await client.query(
        'SELECT capacity, booked FROM slots WHERE id = $1 FOR UPDATE',
        [booking.slot_id]
      );

      if (slotResult.rows.length === 0) {
        throw new Error('Slot not found');
      }

      const slot = slotResult.rows[0];
      if (slot.booked >= slot.capacity) {
        throw new Error('Slot is fully booked');
      }

      // Update slot booking count
      await client.query(
        'UPDATE slots SET booked = booked + 1 WHERE id = $1',
        [booking.slot_id]
      );

      // Create booking
      const bookingResult = await client.query(
        `INSERT INTO bookings 
         (experience_id, slot_id, name, email, phone, promo_code, total_price, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmed')
         RETURNING *`,
        [
          booking.experience_id,
          booking.slot_id,
          booking.name,
          booking.email,
          booking.phone,
          booking.promo_code,
          booking.total_price,
        ]
      );

      await client.query('COMMIT');
      return bookingResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  async getByEmail(email: string): Promise<Booking[]> {
    const result = await db.query(
      'SELECT * FROM bookings WHERE email = $1 ORDER BY created_at DESC',
      [email]
    );
    return result.rows;
  }
};