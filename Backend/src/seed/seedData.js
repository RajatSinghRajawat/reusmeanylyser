export const seedProjects = [
  {
    title: 'Intellix360',
    description:
      'School management system with student records, EMI processing, payments, and role-based access control.',
    tech: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'SQL', 'Tailwind CSS'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-blue-600/80 to-indigo-900/90',
    category: 'EdTech',
    order: 1,
  },
  {
    title: 'SoloTrip',
    description:
      'Travel platform with trip exploration, bookings, blogging, OTP authentication, and secure user profiles.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-cyan-600/80 to-teal-900/90',
    category: 'Travel',
    order: 2,
  },
  {
    title: 'INDIAWALLS',
    description:
      'Construction website with CRM for inquiries, leads, payments, and project tracking.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'CRM'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-amber-600/80 to-orange-900/90',
    category: 'Construction',
    order: 3,
  },
  {
    title: 'Bhavish Properties',
    description:
      'Real estate platform with custom CRM for lead management, bookings, and admin control.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'CRM'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-emerald-600/80 to-green-900/90',
    category: 'Real Estate',
    order: 4,
  },
  {
    title: 'Prodigi',
    description:
      'Education and competition platform with School, Student, and Organizer panels.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Payments'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-violet-600/80 to-purple-900/90',
    category: 'Education',
    order: 5,
  },
  {
    title: 'University Management System',
    description:
      'University website with Student Panel, Admin CRM, attendance, admit cards, and fee management.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'CRM'],
    link: '#',
    github: 'https://github.com/RajatSinghRajawat',
    gradient: 'from-rose-600/80 to-red-900/90',
    category: 'Education',
    order: 6,
  },
];

export const seedSettings = {
  key: 'portfolio',
  profile: {
    name: 'Rajat Singh Rajawat',
    email: 'rajatsinghrajawatrajawat@gmail.com',
    phone: '+91 73003 82651',
    title: 'Full Stack Software Developer',
    about:
      'Full Stack Software Developer with 2+ years of experience building scalable, production-ready web applications using React.js and Node.js.',
    location: 'Greater Jaipur Area, Rajasthan, India',
    resumeFile: '/Rajat_Singh_Rajawat_Resume.pdf',
    socials: [
      { name: 'GitHub', link: 'https://github.com/RajatSinghRajawat' },
      { name: 'LinkedIn', link: 'https://www.linkedin.com/in/rajat-singh-rajawat-450364282/' },
    ],
  },
  home: {
    greeting: "Hi, I'm",
    subtitlePrefix: "I'm a",
    roles: [
      'Full Stack Software Developer',
      'MERN & React Native Engineer',
      'AWS & DevOps Specialist',
      'GenAI & Microservices Developer',
      'System Design (HLD/LLD)',
    ],
    description:
      'Full Stack Software Developer with 2+ years of experience building scalable, production-ready web applications using React.js and Node.js.',
    buttons: {
      primary: { text: 'View My Projects', route: '/projects' },
      secondary: { text: 'Get in Touch', route: '/contact' },
    },
  },
  headlineSkills: [
    'Full Stack Software Developer (FSWD)',
    'MERN & React Native',
    'AWS',
    'DevOps & Docker',
    'GenAI',
    'Microservices',
    'DSA',
    'System Design (HLD/LLD)',
    'Git & GitHub',
  ],
  services: [
    {
      title: 'Frontend Development',
      description:
        'Modern, responsive interfaces with React.js, Next.js, Redux Toolkit, and Tailwind CSS.',
    },
    {
      title: 'Backend Development',
      description:
        'Scalable REST APIs with Node.js, Express, JWT/OTP authentication, and payment integrations.',
    },
    {
      title: 'Full Stack Development',
      description:
        'End-to-end MERN applications, CRM systems, dashboards, and admin panels.',
    },
    {
      title: 'Real-Time & CRM Solutions',
      description:
        'Socket.IO real-time features, custom CRM workflows, and business automation.',
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'WE RNS IT Solutions — Jaipur, India (Onsite)',
      date: '2024 – Present',
      points: [
        'Engineered full-stack applications using React.js, Node.js, Express.js, and MongoDB',
        'Designed scalable REST APIs following MVC architecture',
        'Implemented JWT and OTP authentication with Razorpay integration',
        'Built real-time features using Socket.IO and Redux Toolkit',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Technology, Jaipur',
      date: 'July 2023 – June 2026',
      title: 'Bachelor of Computer Applications (BCA) — 7 CGPA',
      desc: 'Software engineering and web development fundamentals.',
    },
    {
      institution: 'RBSE Board',
      date: '2023',
      title: 'Higher Secondary Certificate — Science (Mathematics)',
      desc: 'Science stream with Mathematics — 70%.',
    },
  ],
  skillGroups: [
    {
      title: 'Frontend Development',
      desc: 'React ecosystems and modern CSS frameworks.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI'],
    },
    {
      title: 'Backend Development',
      desc: 'RESTful APIs and real-time systems.',
      skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Socket.IO'],
    },
    {
      title: 'Database Development',
      desc: 'MongoDB and MySQL data modeling.',
      skills: ['MongoDB', 'MySQL', 'SQL'],
    },
    {
      title: 'Cloud & DevOps',
      desc: 'AWS, Docker, and deployment pipelines.',
      skills: ['AWS', 'Docker', 'DevOps', 'GenAI'],
    },
    {
      title: 'Architecture & Mobile',
      desc: 'System design and cross-platform development.',
      skills: ['Microservices', 'System Design', 'DSA', 'React Native', 'MERN Stack'],
    },
  ],
  resumeSkills: {
    frontend: ['HTML5', 'CSS3', 'React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI', 'React Native'],
    backend: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'Microservices'],
    database: ['MongoDB', 'MySQL', 'SQL'],
    cloud: ['AWS', 'Docker', 'DevOps', 'GenAI'],
    architecture: ['DSA', 'System Design (HLD/LLD)', 'OOP', 'Performance Optimization'],
    tools: ['Git & GitHub', 'Postman', 'Axios', 'Zod', 'React Hook Form', 'VS Code', 'Socket.IO'],
  },
  certifications: [
    'Production MERN stack applications — WE RNS IT Solutions',
    'Payment gateway integration (Razorpay) & secure auth systems',
    'Real-time WebSocket applications with Socket.IO',
  ],
  certificates: [
    {
      title: 'Bachelor of Computer Applications (BCA)',
      issuer: 'University of Technology, Jaipur',
      date: '2023 – 2026',
      credential: '7 CGPA',
      gradient: 'from-indigo-600/80 to-blue-900/90',
    },
    {
      title: 'Higher Secondary Certificate — Science',
      issuer: 'RBSE Board',
      date: '2023',
      credential: '70%',
      gradient: 'from-amber-600/80 to-orange-900/90',
    },
  ],
  contact: {
    email: 'rajatsinghrajawatrajawat@gmail.com',
    phone: '+91 7300382651',
    location: 'Greater Jaipur Area, Rajasthan, India',
    github: 'https://github.com/RajatSinghRajawat',
    linkedin: 'https://www.linkedin.com/in/rajat-singh-rajawat-450364282/',
    whatsapp: 'https://wa.me/917300382651',
  },
  strengths: ['System Design', 'Performance Optimization', 'Problem Solving', 'Team Collaboration', 'Clean Code'],
  languages: ['Hindi (Native)', 'English (Professional Working Proficiency)'],
};
