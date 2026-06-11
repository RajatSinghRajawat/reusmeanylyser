import { Router } from 'express';
import Project from '../models/Project.js';
import Settings from '../models/Settings.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const [settings, projects] = await Promise.all([
      Settings.findOne({ key: 'portfolio' }).lean(),
      Project.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    if (!settings) {
      return res.status(404).json({ success: false, message: 'Portfolio not configured. Run npm run seed.' });
    }

    res.json({
      success: true,
      data: {
        settings,
        projects: projects.map((p) => ({
          _id: p._id,
          title: p.title,
          description: p.description,
          tech: p.tech,
          link: p.link,
          github: p.github,
          gradient: p.gradient,
          category: p.category,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
