import db from '../config/database';
import { PromoCode } from '../types';

export const PromoService = {
  async validatePromo(code: string): Promise<{ valid: boolean; discount?: number }> {
    const result = await db.query(
      `SELECT * FROM promo_codes 
       WHERE code = $1 
       AND valid_from <= CURRENT_TIMESTAMP
       AND (valid_until IS NULL OR valid_until >= CURRENT_TIMESTAMP)
       AND (max_uses IS NULL OR times_used < max_uses)`,
      [code.toUpperCase()]
    );

    if (result.rows.length === 0) {
      return { valid: false };
    }

    const promoCode = result.rows[0];
    return {
      valid: true,
      discount: promoCode.discount_amount
    };
  },

  async usePromoCode(code: string): Promise<void> {
    await db.query(
      'UPDATE promo_codes SET times_used = times_used + 1 WHERE code = $1',
      [code.toUpperCase()]
    );
  }
};