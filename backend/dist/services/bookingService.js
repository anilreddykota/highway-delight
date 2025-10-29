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
exports.BookingService = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.BookingService = {
    create(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            // Start a transaction
            const client = yield database_1.default.connect();
            try {
                yield client.query('BEGIN');
                // Check slot availability
                const slotResult = yield client.query('SELECT capacity, booked FROM slots WHERE id = $1 FOR UPDATE', [booking.slot_id]);
                if (slotResult.rows.length === 0) {
                    throw new Error('Slot not found');
                }
                const slot = slotResult.rows[0];
                if (slot.booked >= slot.capacity) {
                    throw new Error('Slot is fully booked');
                }
                // Update slot booking count
                yield client.query('UPDATE slots SET booked = booked + 1 WHERE id = $1', [booking.slot_id]);
                // Create booking
                const bookingResult = yield client.query(`INSERT INTO bookings 
         (experience_id, slot_id, name, email, phone, promo_code, total_price, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmed')
         RETURNING *`, [
                    booking.experience_id,
                    booking.slot_id,
                    booking.name,
                    booking.email,
                    booking.phone,
                    booking.promo_code,
                    booking.total_price,
                ]);
                yield client.query('COMMIT');
                return bookingResult.rows[0];
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    },
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT * FROM bookings WHERE email = $1 ORDER BY created_at DESC', [email]);
            return result.rows;
        });
    }
};
