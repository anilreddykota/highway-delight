import express, { Request, Response } from 'express';
import { ExperienceService } from '../services/experienceService';

const router = express.Router();

// GET /experiences
router.get('/', async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;
    const experiences = searchQuery
      ? await ExperienceService.search(searchQuery)
      : await ExperienceService.getAll();
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// GET /experiences/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await ExperienceService.getById(parseInt(req.params.id));
    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    if ((error as Error).message === 'Experience not found') {
      res.status(404).json({ error: 'Experience not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch experience' });
    }
  }
});

export default router;