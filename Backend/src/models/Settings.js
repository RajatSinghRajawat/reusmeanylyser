import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'portfolio', unique: true },
    profile: {
      name: String,
      email: String,
      phone: String,
      title: String,
      about: String,
      location: String,
      resumeFile: String,
      socials: [{ name: String, link: String }],
    },
    home: {
      greeting: String,
      subtitlePrefix: String,
      roles: [String],
      description: String,
      buttons: {
        primary: { text: String, route: String },
        secondary: { text: String, route: String },
      },
    },
    headlineSkills: [String],
    services: [{ title: String, description: String }],
    experience: [
      {
        title: String,
        company: String,
        date: String,
        points: [String],
      },
    ],
    education: [
      {
        institution: String,
        date: String,
        title: String,
        desc: String,
      },
    ],
    skillGroups: [
      {
        title: String,
        desc: String,
        skills: [String],
      },
    ],
    resumeSkills: {
      frontend: [String],
      backend: [String],
      database: [String],
      cloud: [String],
      architecture: [String],
      tools: [String],
    },
    certifications: [String],
    certificates: [
      {
        title: String,
        issuer: String,
        date: String,
        credential: String,
        gradient: String,
      },
    ],
    contact: {
      email: String,
      phone: String,
      location: String,
      github: String,
      linkedin: String,
      whatsapp: String,
    },
    strengths: [String],
    languages: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
