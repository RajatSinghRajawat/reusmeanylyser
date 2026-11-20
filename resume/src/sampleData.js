export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: "Senior Full Stack Engineer (React & Node.js)",
    text: `Job Title: Senior Full Stack Engineer
Company: CloudScale Technologies
Location: Remote / Hybrid

About the Role:
We are seeking a high-performing Senior Full Stack Engineer with strong expertise in modern JavaScript/TypeScript, React 19, Node.js microservices, Docker, and AWS/GCP cloud environments. You will architect scalable, resilient web applications that process millions of events daily.

Requirements:
- 4+ years of professional software engineering experience with React, TypeScript, and Node.js.
- Deep understanding of RESTful and GraphQL APIs, PostgreSQL, Redis caching, and MongoDB.
- Solid experience in containerization (Docker, Kubernetes) and CI/CD pipelines (GitHub Actions).
- Proven track record of performance optimization, Web Vitals, and writing rigorous unit and integration tests (Jest, Playwright).
- Strong communication, system design capabilities, and mentoring junior engineers.`
  },
  {
    title: "AI / ML Solutions Engineer",
    text: `Job Title: AI Solutions Engineer
Company: Apex Cognitive Systems
Location: San Francisco, CA / Remote

About the Role:
Join our Applied AI team to productionize generative AI applications, RAG pipelines, and intelligent agent workflows leveraging Gemini API, OpenAI models, vector databases, and Python backend services.

Requirements:
- Bachelor's or Master's in Computer Science, Data Science, or related field.
- Experience with Python, PyTorch, LangChain, LlamaIndex, and Vector DBs (Pinecone, ChromaDB).
- Hands-on experience fine-tuning LLMs, building prompt chains, and structuring JSON outputs.
- Familiarity with cloud architecture (AWS Lambda, Google Cloud Vertex AI, Docker).
- Ability to bridge machine learning research and scalable production web interfaces.`
  }
];

export const SAMPLE_ANALYSIS = {
  atsScore: 84,
  summary: "Highly competitive full-stack resume showcasing strong software craftsmanship, demonstrable impact in React and distributed Node.js architectures, and solid cloud fundamentals. With minor additions of explicit Docker container orchestration metrics and automated testing coverage percentages, this candidate will comfortably rank in the top 5% of ATS applicant pools.",
  strengths: [
    "High density of quantified achievements (e.g., 'Reduced page load time by 42%', 'Scaled throughput to 10k req/sec')",
    "Clear, ATS-compliant single-column chronological structure that parses cleanly across Greenhouse and Workday",
    "Modern technical stack alignment including React 18/19, TypeScript, Express, PostgreSQL, and AWS",
    "Strong evidence of ownership across full lifecycle from requirements to CI/CD production rollout"
  ],
  weaknesses: [
    "Testing and quality assurance methodologies (Jest, Playwright, Cypress) are not explicitly emphasized in recent project bullets",
    "Container orchestration and Docker/Kubernetes tooling is mentioned in skills list but omitted from work experience context",
    "Could incorporate more leadership verbs reflecting cross-functional collaboration and architectural decision-making"
  ],
  improvements: [
    "Rewrite second bullet under senior role using Google's XYZ Formula: 'Accelerated release cycle by 35% by implementing automated GitHub Actions CI/CD workflows across 12 microservices'",
    "Add explicit unit test coverage metrics (e.g., 'Achieved 88% unit test coverage using Jest & React Testing Library')",
    "Include high-demand cloud keywords: AWS Lambda, Docker, Kubernetes, Redis, and Terraform",
    "Add a dedicated 'Key Architectural Accomplishments' section to immediately capture technical recruiter attention within the first 6 seconds"
  ],
  missingKeywords: [
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Redis Caching",
    "CI/CD Pipelines",
    "Jest / Unit Testing",
    "System Design",
    "Microservices Architecture"
  ]
};

export const SAMPLE_EXTRACTED_TEXT = `ALEXANDER R. MORGAN
Senior Full Stack Engineer
San Francisco, CA • alex.morgan@example.com • linkedin.com/in/alexmorgan • github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Senior Full Stack Software Engineer with 5+ years of experience architecting and shipping mission-critical web applications. Expert in React, TypeScript, Node.js microservices, and distributed cloud systems. Proven history of optimizing application performance by 40%+ and scaling products to over 1.2M monthly active users.

CORE TECHNICAL SKILLS
Languages & Frameworks: TypeScript, JavaScript (ESNext), React, Next.js, Node.js, Express, HTML5, CSS3/Tailwind
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, CloudFront, ECS), Docker, Git, RESTful APIs

PROFESSIONAL EXPERIENCE
Senior Software Engineer | FinTech Cloud Corp | 2022 – Present
- Re-architected core customer dashboard in React and TypeScript, decreasing initial bundle size by 38% and boosting Lighthouse performance score from 61 to 96.
- Designed resilient Node.js event-driven microservices handling 4M+ daily transactions with 99.98% uptime.
- Spearheaded database query optimization for PostgreSQL ledger services, reducing median API latency from 280ms to 45ms.
- Mentored a squad of 5 engineers on React best practices, code review hygiene, and state management patterns.

Full Stack Developer | DataVibe Studio | 2020 – 2022
- Developed responsive SaaS analytics portal used by 120+ enterprise clients using React and Express.
- Integrated third-party payment gateways and webhook processing with Stripe API and idempotency guarantees.
- Implemented real-time collaboration canvas with WebSocket connections, reducing sync conflicts by 70%.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley (2016 – 2020)
`;

export const SAMPLE_COVER_LETTER = `Dear Hiring Team,

I am writing to express my enthusiastic interest in the Senior Full Stack Engineer role at CloudScale Technologies. With over five years of dedicated experience building high-scale, resilient web applications in React, TypeScript, and Node.js microservices, I am excited about the opportunity to contribute directly to your high-throughput cloud infrastructure.

In my recent role at FinTech Cloud Corp, I led the architectural overhaul of our flagship customer-facing dashboard. By implementing modern code-splitting, state pruning, and edge caching strategies, my team reduced bundle payload by 38% and lifted Core Web Vitals to a 96 score across all mobile and desktop surfaces. On the backend, I designed distributed Node.js services capable of handling upwards of 4 million transactions daily with 99.98% uptime—experiences that directly mirror CloudScale's commitment to reliability and sub-second user responsiveness.

What particularly draws me to CloudScale Technologies is your engineering culture around developer velocity and architectural elegance. I take great pride not only in shipping clean, observable code, but in elevating team engineering standards through collaborative code reviews, mentorship, and comprehensive automated test coverage.

I would welcome the opportunity to discuss how my technical leadership and hands-on full-stack engineering background can help CloudScale achieve its upcoming roadmap milestones. Thank you for your time and consideration.

Sincerely,
Alexander R. Morgan`;

export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    type: "Technical",
    question: "How did you identify and resolve performance bottlenecks when reducing bundle size and improving Lighthouse scores from 61 to 96?",
    answer: "**Situation:** In our legacy React dashboard, page load times exceeded 4.2s, resulting in client abandonment.\n**Task:** Identify render bottlenecks, cut JS bundle weight, and hit sub-1.5s First Contentful Paint.\n**Action:** Conducted Chrome DevTools flamechart audits, isolated non-critical vendor dependencies, implemented React lazy loading with dynamic imports, and shifted static assets to CloudFront CDN.\n**Result:** Shrunk bundle by 38%, boosted Lighthouse to 96, and saw a 22% increase in dashboard daily engagement."
  },
  {
    id: 2,
    type: "System Design",
    question: "Walk us through how you would architect a Node.js microservice to handle 4M+ transactions with 99.98% uptime and database fault-tolerance.",
    answer: "**Situation:** Our transactional payment ledger required zero message loss under burst traffic.\n**Task:** Ensure horizontal scalability and graceful failure when downstream services experience latency spikes.\n**Action:** Implemented an asynchronous event-driven pattern with Redis queues, partitioned PostgreSQL tables, and added connection pooling with circuit breakers.\n**Result:** Maintained 99.98% uptime during peak holiday traffic without dropping a single transactional event."
  },
  {
    id: 3,
    type: "Behavioral",
    question: "Tell me about a time you had to mentor a junior engineer through a difficult architectural concept or pull request.",
    answer: "**Situation:** A junior developer was struggling with race conditions in asynchronous state updates and complex useEffect hooks.\n**Task:** Help them understand React concurrency and clean state synchronization without blocking feature deadlines.\n**Action:** Scheduled a 1-on-1 pair programming session where we visually diagrammed component lifecycles, replaced fragile state waterfalls with React Query, and established reusable team linting rules.\n**Result:** The engineer independently shipped their subsequent two sprint features with zero production regressions and gained significant confidence."
  }
];
