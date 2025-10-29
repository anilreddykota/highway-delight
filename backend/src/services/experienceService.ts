import db from '../config/database';
import { Experience, Slot } from '../types';

export const ExperienceService = {
  async getAll(): Promise<Experience[]> {
    const result = await db.query(
      'SELECT * FROM experiences ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async getById(id: number): Promise<Experience & { slots: Slot[] }> {
    const experienceResult = await db.query(
      'SELECT * FROM experiences WHERE id = $1',
      [id]
    );

    if (experienceResult.rows.length === 0) {
      throw new Error('Experience not found');
    }

    const slotsResult = await db.query(
      'SELECT * FROM slots WHERE experience_id = $1 AND date >= CURRENT_DATE ORDER BY date, time',
      [id]
    );

    return {
      ...experienceResult.rows[0],
      slots: slotsResult.rows,
    };
  },

  async create(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<Experience> {
    const result = await db.query(
      `INSERT INTO experiences 
       (title, description, about, starting_price, max_count, location, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        experience.title,
        experience.description,
        experience.about,
        experience.starting_price,
        experience.max_count,
        experience.location,
        experience.image_url,
      ]
    );
    return result.rows[0];
  },

  async search(query: string): Promise<Experience[]> {
    const searchQuery = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM experiences 
       WHERE title ILIKE $1 
       OR description ILIKE $1 
       OR about ILIKE $1 
       OR location ILIKE $1 
       ORDER BY created_at DESC`,
      [searchQuery]
    );
    return result.rows;
  }
};