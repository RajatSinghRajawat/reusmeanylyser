import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Settings from '../models/Settings.js';

const router = Router();
router.use(protect);

// Dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const [projects, contacts, newContacts] = await Promise.all([
      Project.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
    ]);
    res.json({ success: true, data: { projects, contacts, newContacts } });
  } catch (err) {
    next(err);
  }
});

// Settings
router.get('/settings', async (req, res, next) => {
  try {
    const settings = await Settings.findOne({ key: 'portfolio' });
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

router.put('/settings', async (req, res, next) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: 'portfolio' },
      { $set: req.body },
      { new: true, runValidators: true, upsert: true }
    );
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

// Projects CRUD
router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

router.post('/projects', async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

router.put('/projects/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

router.delete('/projects/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

// Contacts
router.get('/contacts', async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
});

router.patch('/contacts/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
});

router.delete('/contacts/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
