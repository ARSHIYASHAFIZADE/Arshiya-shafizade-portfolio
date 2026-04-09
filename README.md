<div align="center">

<img src="./src/assets/a.png" alt="Arshiya Shafizade" width="120" style="border-radius: 50%" />

# Arshiya Shafizade — Portfolio

**Full Stack Developer · AI Engineer · 3D Web Enthusiast**

> Interactive 3D personal portfolio showcasing full-stack and AI work. Features rotating GLTF avatar, 3D astronaut character, data visualization carousel, animated skill bars, and Glassmorphic design. Fully responsive with WebGL fallbacks for unsupported devices.

---

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://arshiyashafizade.github.io/Arshiyashafizade-portfolio)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.171.0-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## Overview

A 3D interactive personal portfolio built with React, Three.js, and Framer Motion. Features a rotating GLTF avatar in the hero section, a 3D astronaut character in the contact area, an animated data visualization carousel, project cards with tilt effects, and skill bars with count-up animations. Built with glassmorphic UI design and optimized for all devices.

---

## Features

- **3D Avatar** — rotating GLTF character model in hero section with React Three Fiber and cinematic multi-source lighting
- **3D Astronaut** — interactive 3D astronaut character displayed in contact section with environment lighting
- **Data Visualization Carousel** — 3D rotating carousel showcasing data visualizations with swipe and click navigation
- **Project Cards** — tilt-enabled project showcase cards with smooth hover lift animations
- **Experience Section** — work timeline with animated skill bars and count-up statistics
- **Tech Stack Grid** — comprehensive technology icon grid reflecting full-stack expertise
- **Social Contact Links** — GitHub, LinkedIn, Email, and Phone contact cards with hover effects
- **Glassmorphic Design** — modern frosted glass UI with backdrop blur effects throughout
- **Star Field** — procedurally generated WebGL star background animation
- **Error Boundaries** — all Three.js canvases wrapped with error handling to prevent crashes
- **WebGL Fallback** — graceful degradation with user-friendly message on unsupported devices
- **Fully Responsive** — mobile-first layout with Tailwind breakpoints and adaptive 3D model scaling
- **Smooth Animations** — Framer Motion animations for scroll-triggered effects and page transitions

---

## Tech Stack

### Core

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.14-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.28.0-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

### 3D & Animation

![Three.js](https://img.shields.io/badge/Three.js-0.171.0-black?style=flat-square&logo=threedotjs&logoColor=white)
![R3F](https://img.shields.io/badge/@react--three/fiber-8.17.10-black?style=flat-square&logo=threedotjs&logoColor=white)
![Drei](https://img.shields.io/badge/@react--three/drei-9.116.1-black?style=flat-square&logo=threedotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.17-0055FF?style=flat-square&logo=framer&logoColor=white)

### UI Components

![Swiper](https://img.shields.io/badge/Swiper-11.1.15-6332F6?style=flat-square&logo=swiper&logoColor=white)
![react-tilt](https://img.shields.io/badge/react--tilt-1.0.2-gray?style=flat-square)
![react-error-boundary](https://img.shields.io/badge/react--error--boundary-5.0.0-gray?style=flat-square)

### Deployment

![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-gh--pages_6.3.0-181717?style=flat-square&logo=github&logoColor=white)

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm

### Installation

```bash
# 1. Clone
git clone https://github.com/ARSHIYASHAFIZADE/-Arshiya-shafizade-portfolio.git
cd Arshiya-shafizade-portfolio

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

See `.env.example` for configuration options. No sensitive keys required for basic functionality.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build + deploy to GitHub Pages |

---

## Project Structure

```
Arshiya-shafizade-portfolio/
├── public/
│   ├── Avatar/               GLTF avatar model + textures
│   └── Astronaut/            GLTF astronaut model + textures
├── src/
│   ├── assets/               Images, icons, tech logos
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Avatar.jsx    3D avatar in hero section
│   │   │   ├── Astronaut.jsx 3D astronaut in contact section
│   │   │   └── Stars.jsx     WebGL star field background
│   │   ├── About.jsx
│   │   ├── Contact.jsx       Contact section with social cards + astronaut
│   │   ├── DV.jsx            Data Visualization carousel
│   │   ├── Experience.jsx    Work timeline with skill bars
│   │   ├── Feedbacks.jsx     Education & testimonials
│   │   ├── Hero.jsx          Hero intro section
│   │   ├── Navbar.jsx
│   │   ├── Tech.jsx          Technology skills grid
│   │   ├── Works.jsx         Project cards showcase
│   │   └── Loader.jsx        Canvas loading spinner
│   ├── constants/
│   │   └── index.js          Site data (projects, skills, experience)
│   ├── hoc/
│   │   └── SectionWrapper.jsx  Scroll-triggered section animations
│   ├── utils/
│   │   └── motion.js         Framer Motion animation variants
│   ├── styles.js
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example              Environment variables template
├── vite.config.js            Vite configuration
├── tailwind.config.cjs
└── package.json
```

---

## Featured Projects

<table>
  <tr>
    <td align="center" width="25%">
      <strong>Ashxcribe</strong><br/>
      <sub>Next.js · Supabase · Groq AI · Tailwind</sub><br/><br/>
      SCRUM standup automation with real-time transcription and AI document generation<br/><br/>
      <a href="https://scrum-tassk-automation.vercel.app">
        <img src="https://img.shields.io/badge/Live-Visit-6366f1?style=flat-square&logo=vercel" />
      </a>
    </td>
    <td align="center" width="25%">
      <strong>The Neon Canopy</strong><br/>
      <sub>Three.js · Next.js · Framer Motion · TypeScript</sub><br/><br/>
      Immersive 3D bioluminescent jungle with procedural audio and post-processing<br/><br/>
      <a href="https://my-jungle-seven.vercel.app">
        <img src="https://img.shields.io/badge/Live-Visit-6366f1?style=flat-square&logo=vercel" />
      </a>
    </td>
    <td align="center" width="25%">
      <strong>ALF — Ash Loves Files</strong><br/>
      <sub>Next.js · FastAPI · Python · Docker</sub><br/><br/>
      Universal file converter supporting 120+ formats across 8 categories<br/><br/>
      <a href="https://frontend-production-2bfcc.up.railway.app">
        <img src="https://img.shields.io/badge/Live-Visit-6366f1?style=flat-square&logo=railway" />
      </a>
    </td>
    <td align="center" width="25%">
      <strong>SAM AI</strong><br/>
      <sub>Next.js · Flask · scikit-learn · Mistral-7B</sub><br/><br/>
      AI clinical diagnostics platform with 5 ML models and medical Q&A chatbot<br/><br/>
      <a href="https://frontend-production-0b91.up.railway.app">
        <img src="https://img.shields.io/badge/Live-Visit-6366f1?style=flat-square&logo=railway" />
      </a>
    </td>
  </tr>
</table>

---

## Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-shafizadearshiya@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shafizadearshiya@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-ARSHIYASHAFIZADE-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ARSHIYASHAFIZADE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arshiya--shafizade-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arshiya-shafizade)

</div>

---

## License

Distributed under the MIT License.
