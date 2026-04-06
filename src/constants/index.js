import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  docker,
  image,
  carrent,
  threejs,
  render,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Web Developer",
    icon: "https://cdn2.iconfinder.com/data/icons/seo-and-web-development-filled-outline/64/Backend-Development-Website-Server-Internet-1024.png",
  },
  {
    title: "Data Scientist",
    icon: "https://cdn-icons-png.flaticon.com/512/4824/4824797.png",
  },
  {
    title: "Data visualizer",
    icon: "https://cdn2.iconfinder.com/data/icons/artifiial-intelligence/70/48_Data_Visualization-1024.png",
  },
  {
    title: "Researcher",
    icon: "https://icon-library.com/images/research-icon-png/research-icon-png-9.jpg",
  },
];

const technologies = [
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node.js", icon: nodejs },
  { name: "Python", icon: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
  { name: "FastAPI", icon: "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg" },
  { name: "PostgreSQL", icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
  { name: "Three.js", icon: threejs },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Ashxcribe",
    icon: "https://image.thum.io/get/width/100/crop/100/https://scrum-tassk-automation.vercel.app",
    iconBg: "#1a1a2e",
    date: "2025",
    points: [
      "Built a multi-tenant SCRUM standup automation platform with real-time transcription via Web Speech API and Groq Whisper.",
      "Integrated Groq Llama 3.3 70B to auto-generate structured SCRUM documents from raw speech transcripts.",
      "Implemented Supabase authentication with Row Level Security, Cloudflare Turnstile bot protection, and full security hardening.",
      "Supported multi-company workspaces, custom templates, and PDF/DOCX/audio export.",
    ],
  },
  {
    title: "3D & Creative Developer",
    company_name: "The Neon Canopy",
    icon: "https://image.thum.io/get/width/100/crop/100/https://my-jungle-seven.vercel.app",
    iconBg: "#0d2818",
    date: "2025",
    points: [
      "Designed and built an immersive bioluminescent 3D jungle experience featuring six mythical creatures with cinematic visuals.",
      "Implemented procedural audio synthesis using the Web Audio API for reactive soundscapes.",
      "Applied 7 composited post-processing effects: bloom, depth-of-field, chromatic aberration, vignette, and more.",
      "Built a five-phase cinematic intro sequence with particle systems using React Three Fiber and Framer Motion.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "ALF — Ash Loves Files",
    icon: "https://image.thum.io/get/width/100/crop/100/https://frontend-production-2bfcc.up.railway.app",
    iconBg: "#1a0a2e",
    date: "2025",
    points: [
      "Built a universal file converter supporting 120+ formats across 8 categories: image, document, audio, video, ebook, archive, data, and font.",
      "Architected a FastAPI backend with Celery + Redis task queue for async conversions and real-time progress tracking.",
      "Bundled FFmpeg, LibreOffice, Pandoc, ImageMagick, and Calibre into a Docker image for zero-dependency deployment.",
      "Designed a Next.js 15 frontend with drag-and-drop upload, format explorer, and automatic file cleanup after 1 hour.",
    ],
  },
  {
    title: "AI / ML Developer",
    company_name: "SAM AI",
    icon: "https://image.thum.io/get/width/100/crop/100/https://frontend-production-0b91.up.railway.app",
    iconBg: "#0a1a2e",
    date: "2024",
    points: [
      "Developed an AI clinical diagnostic platform with five scikit-learn ML models screening for heart disease, diabetes, liver disease, and breast cancer.",
      "Integrated Hugging Face Mistral-7B for a medical Q&A chatbot with clinical context awareness.",
      "Built automated PDF report generation for diagnostic results and risk scores with confidence intervals.",
      "Deployed on Railway with a Next.js frontend, Flask backend, Redis for session management, and PostgreSQL database.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Research and Publications:Co-authored research on Diagnosis of Breast Cancer Tumor Type, using AI to enhance diagnostic accuracy through a fuzzy combination of regression methods.",
    name: "Research and Publications",
    designation: "Developer&researcher",
    company: "SamAi",
    image: image,
  },
  {
    testimonial: "CIMP Diploma",
    name: "Sunway University in sunway city-Malaysia",
    designation: "Student",
    company: "Sunway University",
    image:
      "https://th.bing.com/th/id/R.e914efa552b34eeb7845d9042ec9d4e9?rik=7HX9fTJvjui1MQ&riu=http%3a%2f%2fwww.chooseright.org%2fwp-content%2fuploads%2f2014%2f04%2fSunway-University-logo.jpg&ehk=%2fQjLTJAyL2c5ul0ZQDjlIA6pI0z1GWNH5rhvRfLARzg%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    testimonial:
      "Bachelor of Computer Science, Specialization in AI and extension in Data Science!, Second year student with CGPA:3.5",
    name: "Taylor's University in sunway city-Malaysia",
    designation: "Student",
    company: "Taylor's University",
    image:
      "https://media.glassdoor.com/sqll/319279/taylor-s-university-college-squarelogo-1428399291142.png",
  },
];

const projects = [
  {
    name: "Ashxcribe",
    description:
      "Multi-tenant SCRUM standup platform that records meetings, transcribes them in real-time with Groq Whisper, and generates AI-powered SCRUM documents. Supports multi-company workspaces, custom templates, and PDF/DOCX export.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Supabase", color: "green-text-gradient" },
      { name: "Groq AI", color: "pink-text-gradient" },
      { name: "Tailwind", color: "blue-text-gradient" },
    ],
    image: "https://image.thum.io/get/width/400/crop/230/https://scrum-tassk-automation.vercel.app",
    icon: render,
    source_code_link: "https://scrum-tassk-automation.vercel.app",
  },
  {
    name: "The Neon Canopy",
    description:
      "An immersive 3D bioluminescent jungle experience featuring six mythical creatures with cinematic visuals, procedural audio synthesis, and a five-phase animated introduction. Built with Three.js, React Three Fiber, and advanced post-processing effects.",
    tags: [
      { name: "Three.js", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "Framer Motion", color: "pink-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
    ],
    image: "https://image.thum.io/get/width/400/crop/230/https://my-jungle-seven.vercel.app",
    icon: render,
    source_code_link: "https://my-jungle-seven.vercel.app",
  },
  {
    name: "ALF — Ash Loves Files",
    description:
      "Universal file converter supporting 120+ formats across 8 categories including image, document, audio, video, ebook, archive, data, and font. Free, no sign-up required. Built with a FastAPI backend, Celery task queue, and Docker containerization.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "FastAPI", color: "green-text-gradient" },
      { name: "Python", color: "pink-text-gradient" },
      { name: "Docker", color: "blue-text-gradient" },
    ],
    image: "https://image.thum.io/get/width/400/crop/230/https://frontend-production-2bfcc.up.railway.app",
    icon: render,
    source_code_link: "https://frontend-production-2bfcc.up.railway.app",
  },
  {
    name: "SAM AI — Clinical Diagnostics",
    description:
      "AI-powered clinical diagnostic platform with five ML models screening for heart disease, diabetes, liver disease, and breast cancer. Returns risk scores with confidence intervals in under one second. Includes a medical Q&A chatbot powered by Mistral-7B.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Flask", color: "green-text-gradient" },
      { name: "scikit-learn", color: "pink-text-gradient" },
      { name: "Mistral-7B", color: "blue-text-gradient" },
    ],
    image: "https://image.thum.io/get/width/400/crop/230/https://frontend-production-0b91.up.railway.app",
    icon: render,
    source_code_link: "https://frontend-production-0b91.up.railway.app",
  },
];

export { services, technologies, experiences, testimonials, projects };
