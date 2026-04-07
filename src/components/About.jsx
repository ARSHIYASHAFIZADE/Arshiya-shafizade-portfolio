import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

/* ── Glow helper ─────────────────────────────────────────────────────────── */
const G = ({ c, children, gradient }) => {
  if (gradient) {
    return (
      <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>
        {children}
      </span>
    );
  }
  return (
    <span style={{ color: c, fontWeight: 600, textShadow: `0 0 8px ${c}90, 0 0 22px ${c}45` }}>
      {children}
    </span>
  );
};

/* ── Animation variants ───────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};
const paraVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Card metadata ────────────────────────────────────────────────────────── */
const CARD_META = [
  {
    title: "Full Stack Developer",
    color: "#38bdf8",
    tagline: "End-to-end production systems",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    num: "01",
  },
  {
    title: "AI / LLM Engineer",
    color: "#a78bfa",
    tagline: "LLM orchestration & RAG pipelines",
    tags: ["OpenAI", "Groq", "RAG", "Agents"],
    num: "02",
  },
  {
    title: "3D Creative Developer",
    color: "#06b6d4",
    tagline: "Immersive 3D web experiences",
    tags: ["Three.js", "R3F", "WebGL", "GLSL"],
    num: "03",
  },
  {
    title: "ML Engineer",
    color: "#f97316",
    tagline: "Clinical ML & diagnostic systems",
    tags: ["Python", "scikit-learn", "FastAPI", "Data"],
    num: "04",
  },
];

/* ── Service card ─────────────────────────────────────────────────────────── */
const ServiceCard = ({ index, title, icon, color, tagline, tags, num }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
      className="relative flex-1 min-w-[210px] max-w-[270px] rounded-2xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: "rgba(9,9,31,0.85)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = `0 24px 72px ${color}25, 0 8px 40px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.45)";
      }}
    >
      {/* Animated accent top bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 + 0.35 }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}70, transparent)` }}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${color}18 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Bottom radial glow — intensifies on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${color}0d, transparent)` }}
      />

      {/* Ghost number */}
      <div
        className="absolute bottom-4 right-4 font-black leading-none select-none pointer-events-none"
        style={{ fontSize: "90px", color: `${color}0c`, lineHeight: 1 }}
      >
        {num}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-5 p-7 flex-1">

        {/* Icon block */}
        <div className="relative w-fit">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl"
            style={{ background: color, opacity: 0.18 }}
          />
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="relative w-[68px] h-[68px] rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}18, ${color}08)`,
              border: `1px solid ${color}30`,
            }}
          >
            <img
              src={icon}
              alt={title}
              className="w-[55%] h-[55%] object-contain"
            />
          </motion.div>
        </div>

        {/* Title + tagline */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {/* Pulsing status dot */}
            <span className="relative flex-shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                style={{ background: color }}
              />
              <span
                className="relative inline-flex w-2 h-2 rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              />
            </span>
            <h3 className="text-white font-bold text-[17px] leading-snug">{title}</h3>
          </div>
          <p className="text-slate-500 text-[11.5px] font-mono leading-relaxed pl-4">
            {tagline}
          </p>
        </div>

        {/* Gradient divider */}
        <div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${color}35, transparent)` }}
        />

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.12 + 0.5 + i * 0.05 }}
              className="px-2.5 py-1 rounded-full text-[10.5px] font-mono font-medium"
              style={{ color, background: `${color}10`, border: `1px solid ${color}28` }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

/* ── About ────────────────────────────────────────────────────────────────── */
const About = () => {
  // Merge icon from services data with metadata
  const cards = CARD_META.map(meta => ({
    ...meta,
    icon: services.find(s => s.title === meta.title)?.icon,
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Thin gradient rule */}
      <motion.div
        variants={fadeIn("", "", 0.05, 0.6)}
        className="mt-4 mb-2 h-px w-24 rounded-full"
        style={{ background: "linear-gradient(90deg, #a78bfa, #38bdf8, transparent)" }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="mt-4 max-w-3xl flex flex-col gap-6"
      >
        <motion.p variants={paraVariants} className="text-slate-300 text-[18px] leading-[1.9] font-normal tracking-[0.01em]">
          I'm a full-stack engineer and AI developer studying Computer Science
          (AI&nbsp;+&nbsp;Data Science) at{" "}
          <G c="#34d399">Taylor's University</G> while shipping production
          systems at <G c="#a78bfa">Coolriots</G> and{" "}
          <G c="#38bdf8">LeadAlways</G>. My core stack is{" "}
          <G c="#61dafb">React</G>{" "}
          <span className="text-slate-500">/</span>{" "}
          <G c="#60a5fa">TypeScript</G> on the frontend,{" "}
          <G c="#4ade80">Node.js</G> and <G c="#2dd4bf">FastAPI</G> on the
          backend, and <G c="#f87171">Redis</G> and vector databases like{" "}
          <G c="#22d3ee">Milvus</G> in production.
        </motion.p>

        <motion.p variants={paraVariants} className="text-slate-300/90 text-[17px] leading-[1.9] font-normal tracking-[0.01em]">
          My deepest work is in <G c="#00f0ff">AI engineering</G> — designing
          LLM orchestration systems, RAG pipelines, and agentic workflows. At
          Coolriots I architected the{" "}
          <G gradient="linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)">
            OpCode V2 CPIE
          </G>
          : a JSON-based workflow engine supporting 8+ providers (OpenAI, Groq,
          Gemini, WatsonX, Mistral and more), conditional routing, memory
          threading, and real-time{" "}
          <G c="#fbbf24">WebSocket</G> token streaming to the frontend.
        </motion.p>

        <motion.p variants={paraVariants} className="text-slate-300/80 text-[17px] leading-[1.9] font-normal tracking-[0.01em]">
          Beyond production work I build immersive{" "}
          <G c="#e2e8f0">3D</G> web experiences with{" "}
          <G c="#c4b5fd">Three.js</G> and ML-powered applications with
          scikit-learn. I bring the same precision to a cinematic 3D jungle as
          I do to a 100K-line enterprise SaaS codebase —{" "}
          <span className="text-slate-200 font-medium italic">
            ship fast, care about the details,
          </span>{" "}
          and always push what's possible on the web.
        </motion.p>
      </motion.div>

      {/* Service cards */}
      <div className="mt-20 flex flex-wrap gap-6">
        {cards.map((card, index) => (
          <ServiceCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
