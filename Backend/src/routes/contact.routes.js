import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { yourname, email, Connectwith, name, message } = req.body;
    const contactName = yourname || name;
    const contactMessage = Connectwith || message;

    if (!contactName || !email || !contactMessage) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const contact = await Contact.create({
      name: contactName.trim(),
      email: email.trim().toLowerCase(),
      message: contactMessage.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contact._id },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
