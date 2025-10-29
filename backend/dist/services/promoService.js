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
exports.PromoService = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.PromoService = {
    validatePromo(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`SELECT * FROM promo_codes 
       WHERE code = $1 
       AND valid_from <= CURRENT_TIMESTAMP
       AND (valid_until IS NULL OR valid_until >= CURRENT_TIMESTAMP)
       AND (max_uses IS NULL OR times_used < max_uses)`, [code.toUpperCase()]);
            if (result.rows.length === 0) {
                return { valid: false };
            }
            const promoCode = result.rows[0];
            return {
                valid: true,
                discount: promoCode.discount_amount
            };
        });
    },
    usePromoCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE promo_codes SET times_used = times_used + 1 WHERE code = $1', [code.toUpperCase()]);
        });
    }
};
