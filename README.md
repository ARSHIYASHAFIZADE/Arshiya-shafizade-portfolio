# Arshiya Shafizade — Portfolio

Live: https://arshiyashafizade.github.io/Arshiyashafizade-portfolio

A 3D interactive personal portfolio built with React, Three.js, and Framer Motion. Features a rotating 3D avatar, an animated phone model in the contact section, project showcases, work experience timeline, and a working contact form.

---

## Features

- **3D Avatar** — rotating GLTF character model in the hero section rendered with React Three Fiber
- **Animated Phone** — slow-rotating phone model with float animation in the contact section
- **Project Cards** — tilt-on-hover cards with live screenshot previews pulled from each project's URL
- **Work Experience** — swipeable carousel with equal-height cards and smooth hover animations
- **Skills Grid** — tech icon grid reflecting the full stack used across all projects
- **Contact Form** — glassmorphic form wired to EmailJS with send spinner and success state
- **Star Background** — procedurally generated star field rendered in WebGL
- **6 Sections** — Hero, About, Experience, Skills, Projects, Testimonials, Contact

---

## Tech Stack

| | Package | Version |
|---|---|---|
| **Framework** | React | ^18.3.1 |
| **Build Tool** | Vite + @vitejs/plugin-react | ^5.4.10 / ^4.3.4 |
| **3D Rendering** | Three.js | ^0.171.0 |
| **3D React** | @react-three/fiber | ^8.17.10 |
| **3D Helpers** | @react-three/drei | ^9.116.1 |
| **Animations** | Framer Motion | ^11.11.17 |
| **Routing** | React Router DOM | ^6.28.0 |
| **Carousel** | Swiper | ^11.1.15 |
| **Email** | @emailjs/browser | ^4.4.1 |
| **Tilt Effect** | react-tilt | ^1.0.2 |
| **Error Handling** | react-error-boundary | ^5.0.0 |
| **Styling** | Tailwind CSS | ^3.4.14 |
| **Math Utils** | maath | ^0.10.8 |
| **Deploy** | gh-pages | ^6.3.0 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/ARSHIYASHAFIZADE/Arshiyashafizade-portfolio.git
cd Arshiyashafizade-portfolio
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://emailjs.com). The template ID used is `template_7rkkl05` — update it in `Contact.jsx` if you use a different template.

---

## Project Structure

```
src/
  assets/              Static images and icons
  components/
    canvas/
      Avatar.jsx       Rotating 3D character model (hero section)
      Phone.jsx        Animated phone model (contact section)
      Stars.jsx        Procedural WebGL star background
    About.jsx
    Contact.jsx        EmailJS contact form
    Experience.jsx     Swipeable project/experience carousel
    Feedbacks.jsx      Testimonials / education section
    Hero.jsx           Landing section with 3D avatar
    Navbar.jsx
    Tech.jsx           Skills icon grid
    Works.jsx          Project cards with live screenshots
  constants/
    index.js           All data: projects, experience, skills, nav links
  hoc/
    SectionWrapper.jsx Scroll animation wrapper
  utils/
    motion.js          Framer Motion variants
  styles.js
  App.jsx
  main.jsx
```

---

## Featured Projects

| Project | Stack | Live |
|---|---|---|
| **Ashxcribe** | Next.js, Supabase, Groq AI, Tailwind | [scrum-tassk-automation.vercel.app](https://scrum-tassk-automation.vercel.app) |
| **The Neon Canopy** | Three.js, Next.js, Framer Motion, TypeScript | [my-jungle-seven.vercel.app](https://my-jungle-seven.vercel.app) |
| **ALF — Ash Loves Files** | Next.js, FastAPI, Python, Docker | [frontend-production-2bfcc.up.railway.app](https://frontend-production-2bfcc.up.railway.app) |
| **SAM AI** | Next.js, Flask, scikit-learn, Mistral-7B | [frontend-production-0b91.up.railway.app](https://frontend-production-0b91.up.railway.app) |

---

## Contact

- Email: shafizadearshiya@gmail.com
- GitHub: [ARSHIYASHAFIZADE](https://github.com/ARSHIYASHAFIZADE)
- LinkedIn: [arshiya-shafizade](https://www.linkedin.com/in/arshiya-shafizade)

---

## License

MIT
