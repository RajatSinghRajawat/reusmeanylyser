import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Settings from '../models/Settings.js';
import { seedProjects, seedSettings } from './seedData.js';

dotenv.config();

const run = async () => {
  await connectDB();

  await User.deleteMany({});
  await Project.deleteMany({});
  await Settings.deleteMany({});

  await User.create({
    name: 'Rajat Admin',
    email: process.env.ADMIN_EMAIL || 'admin@rajat.dev',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  });

  await Project.insertMany(seedProjects);
  await Settings.create(seedSettings);

  console.log('Database seeded successfully.');
  console.log(`Admin login: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
