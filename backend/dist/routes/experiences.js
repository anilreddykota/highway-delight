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
const experienceService_1 = require("../services/experienceService");
const router = express_1.default.Router();
// GET /experiences
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.search;
        const experiences = searchQuery
            ? yield experienceService_1.ExperienceService.search(searchQuery)
            : yield experienceService_1.ExperienceService.getAll();
        res.json(experiences);
    }
    catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
}));
// GET /experiences/:id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experience = yield experienceService_1.ExperienceService.getById(parseInt(req.params.id));
        res.json(experience);
    }
    catch (error) {
        console.error('Error fetching experience:', error);
        if (error.message === 'Experience not found') {
            res.status(404).json({ error: 'Experience not found' });
        }
        else {
            res.status(500).json({ error: 'Failed to fetch experience' });
        }
    }
}));
exports.default = router;
