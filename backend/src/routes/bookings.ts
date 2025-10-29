import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BookingService } from '../services/bookingService';
import { PromoService } from '../services/promoService';

const router = express.Router();

// POST /bookings
router.post(
  '/',
  [
    body('experience_id').isInt().withMessage('Valid experience ID is required'),
    body('slot_id').isInt().withMessage('Valid slot ID is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number'),
    body('total_price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // If promo code is provided, validate it
      if (req.body.promo_code) {
        const promoValidation = await PromoService.validatePromo(req.body.promo_code);
        if (!promoValidation.valid) {
          return res.status(400).json({ error: 'Invalid promo code' });
        }
        // Apply promo code if valid
        await PromoService.usePromoCode(req.body.promo_code);
      }

      const booking = await BookingService.create({
        experience_id: req.body.experience_id,
        slot_id: req.body.slot_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        promo_code: req.body.promo_code,
        total_price: req.body.total_price,
      });

      res.status(201).json({
        success: true,
        bookingId: booking.id,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      if ((error as Error).message === 'Slot is fully booked') {
        res.status(400).json({ error: 'Slot is fully booked' });
      } else {
        res.status(500).json({ error: 'Failed to create booking' });
      }
    }
  }
);

export default router;