"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bookingService_1 = require("../services/bookingService");
const promoService_1 = require("../services/promoService");
const router = express_1.default.Router();
// POST /bookings
router.post('/', [
    (0, express_validator_1.body)('experience_id').isInt().withMessage('Valid experience ID is required'),
    (0, express_validator_1.body)('slot_id').isInt().withMessage('Valid slot ID is required'),
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').optional().matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number'),
    (0, express_validator_1.body)('total_price').isFloat({ min: 0 }).withMessage('Valid price is required'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // If promo code is provided, validate it
        if (req.body.promo_code) {
            const promoValidation = yield promoService_1.PromoService.validatePromo(req.body.promo_code);
            if (!promoValidation.valid) {
                return res.status(400).json({ error: 'Invalid promo code' });
            }
            // Apply promo code if valid
            yield promoService_1.PromoService.usePromoCode(req.body.promo_code);
        }
        const booking = yield bookingService_1.BookingService.create({
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
    }
    catch (error) {
        console.error('Error creating booking:', error);
        if (error.message === 'Slot is fully booked') {
            res.status(400).json({ error: 'Slot is fully booked' });
        }
        else {
            res.status(500).json({ error: 'Failed to create booking' });
        }
    }
}));
exports.default = router;
