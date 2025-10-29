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
exports.ExperienceService = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.ExperienceService = {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT * FROM experiences ORDER BY created_at DESC');
            return result.rows;
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const experienceResult = yield database_1.default.query('SELECT * FROM experiences WHERE id = $1', [id]);
            if (experienceResult.rows.length === 0) {
                throw new Error('Experience not found');
            }
            const slotsResult = yield database_1.default.query('SELECT * FROM slots WHERE experience_id = $1 AND date >= CURRENT_DATE ORDER BY date, time', [id]);
            return Object.assign(Object.assign({}, experienceResult.rows[0]), { slots: slotsResult.rows });
        });
    },
    create(experience) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`INSERT INTO experiences 
       (title, description, about, starting_price, max_count, location, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`, [
                experience.title,
                experience.description,
                experience.about,
                experience.starting_price,
                experience.max_count,
                experience.location,
                experience.image_url,
            ]);
            return result.rows[0];
        });
    },
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchQuery = `%${query}%`;
            const result = yield database_1.default.query(`SELECT * FROM experiences 
       WHERE title ILIKE $1 
       OR description ILIKE $1 
       OR about ILIKE $1 
       OR location ILIKE $1 
       ORDER BY created_at DESC`, [searchQuery]);
            return result.rows;
        });
    }
};
