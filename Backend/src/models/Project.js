import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    link: { type: String, default: '#' },
    github: { type: String, default: '' },
    gradient: { type: String, default: 'from-accent/60 to-primary' },
    category: { type: String, default: 'Web' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
