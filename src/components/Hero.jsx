import React from 'react';
import { motion } from "framer-motion";
import { styles } from "../styles";
import { AvatarCanvas} from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen md:h-screen sm:min-h-[600px] min-h-[500px] mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 ml-0 z-20 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#bbd3ff]" />
          <div className="w-1 sm:h-80 h-40 bg-[#bbd3ff]" />
        </div>

        <div className="ml-0 pl-5 pr-4 max-w-md sm:max-w-lg md:max-w-xl pointer-events-auto">
          <h1 className={`${styles.heroHeadText} text-white break-words`}>
            Hi, I'm <span className="text-[#92f8f3]">Arshiya</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 break-words`}>
            Full Stack Engineer &amp; AI Developer
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-6">
            {[
              { href: "https://github.com/ARSHIYASHAFIZADE", label: "GitHub", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", fill: true },
              { href: "https://www.linkedin.com/in/arshiya-shafizade", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z", fill: true },
              { href: "mailto:shafizadearshiya@gmail.com", label: "Email", path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", fill: false },
            ].map(({ href, label, path, fill }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth={fill ? undefined : "1.8"} strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <AvatarCanvas />

    </section>
  );
};

export default Hero;
