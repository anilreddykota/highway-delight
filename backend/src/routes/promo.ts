import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PromoService } from '../services/promoService';

const router = express.Router();

// POST /promo/validate
router.post(
  '/validate',
  [
    body('code').trim().notEmpty().withMessage('Promo code is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await PromoService.validatePromo(req.body.code);
      res.json(result);
    } catch (error) {
      console.error('Error validating promo:', error);
      res.status(500).json({ error: 'Failed to validate promo code' });
    }
  }
);

export default router;