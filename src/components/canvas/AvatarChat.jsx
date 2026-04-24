import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Voice recognition hook
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState("");
  const recognitionRef = useRef(null);
  const manualStopRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const supported = !!SpeechRecognition;
    setSpeechSupported(supported);
    if (!supported) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    let interim = "";
    let finalBuf = "";

    recognition.onresult = (event) => {
      interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) finalBuf += res[0].transcript + " ";
        else interim += res[0].transcript;
      }
      const combined = (finalBuf + interim).trim();
      setTranscript(combined);
    };

    recognition.onerror = (event) => {
      console.error("AvatarChat: Speech recognition error:", event.error);
      if (event.error === "network") setSpeechError("Speech service unreachable — please type instead.");
      else if (event.error === "not-allowed" || event.error === "service-not-allowed") setSpeechError("Microphone blocked — allow it in browser settings.");
      else if (event.error === "no-speech") setSpeechError("Didn't catch that — try again.");
      else setSpeechError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      const text = (finalBuf + interim).trim();
      finalBuf = "";
      interim = "";
      if (text) setFinalTranscript(text);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    return () => recognition.abort();
  }, []);

  const startListening = useCallback(() => {
    if (!speechSupported || !recognitionRef.current) {
      setSpeechError("Voice not supported — use Chrome/Edge/Safari.");
      return;
    }
    if (isListening) { manualStopRef.current = true; recognitionRef.current.stop(); return; }
    setTranscript("");
    setFinalTranscript("");
    setSpeechError("");
    manualStopRef.current = false;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      // "already started" — stop then restart
      try { recognitionRef.current.stop(); } catch {}
      setSpeechError("Mic busy — try again.");
    }
  }, [speechSupported, isListening]);

  const stopListening = useCallback(() => {
    manualStopRef.current = true;
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  return { isListening, transcript, finalTranscript, speechSupported, speechError, startListening, stopListening };
};

// TTS hook using browser TTS; drives lip-sync via word-boundary events
// Locks to a single male English voice so it doesn't swap mid-session.
const useTextToSpeech = () => {
  const speakRef = useRef(null);
  const voiceRef = useRef(null);

  const pickMaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;
    const prefs = [
      /google uk english male/i,
      /google us english.*male/i,
      /microsoft david/i,
      /microsoft guy/i,
      /microsoft mark/i,
      /daniel/i,
      /^alex$/i,
      /^fred$/i,
      /male/i,
    ];
    for (const p of prefs) {
      const v = voices.find(x => p.test(x.name) && /^en/i.test(x.lang));
      if (v) return v;
    }
    return voices.find(v => /^en/i.test(v.lang)) || voices[0];
  };

  useEffect(() => {
    const load = () => { voiceRef.current = pickMaleVoice(); };
    load();
    speechSynthesis.onvoiceschanged = load;
    return () => { speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text, onEnd, onViseme) => {
    if (speakRef.current) speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    if (!voiceRef.current) voiceRef.current = pickMaleVoice();
    if (voiceRef.current) utterance.voice = voiceRef.current;

    let decayTimer = null;
    const pulse = (strength) => {
      onViseme?.(strength);
      if (decayTimer) clearTimeout(decayTimer);
      decayTimer = setTimeout(() => onViseme?.(0.08), 140);
    };

    utterance.onstart = () => pulse(0.5);
    utterance.onboundary = (e) => {
      if (e.name !== "word") return;
      const word = text.slice(e.charIndex, e.charIndex + (e.charLength || 4));
      // Strength scales with word length + vowels (rough approximation of openness)
      const vowels = (word.match(/[aeiouAEIOU]/g) || []).length;
      const strength = Math.min(1, 0.35 + vowels * 0.15 + word.length * 0.03);
      pulse(strength);
    };
    utterance.onend = () => {
      if (decayTimer) clearTimeout(decayTimer);
      onViseme?.(0);
      onEnd?.();
    };
    utterance.onerror = () => {
      if (decayTimer) clearTimeout(decayTimer);
      onViseme?.(0);
      onEnd?.();
    };

    speakRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
  }, []);

  return { speak, stop };
};

// Resume context - embedded directly
const RESUME_CONTEXT = `ARSHIYA SHAFIZADE
Full Stack Engineer & AI Developer

CONTACT:
Email: shafizadearshiya@gmail.com
LinkedIn: linkedin.com/in/arshiya-shafizade
GitHub: github.com/ARSHIYASHAFIZADE
Portfolio: arshiyashafizade-portfolio.vercel.app

EDUCATION:
Taylor's University - Bachelor of Computer Science (AI & Data Science), Expected June2026
Sunway College - CIMP Diploma (Canadian)

WORK EXPERIENCE:
1. CoolRiots - Full Stack Developer (Feb 2025 - Present)
   - 600-file/102K LOC React + TypeScript SPA, 290-file/28K LOC Node.js + Express backend for BeX AI platform
   - Designed OpCode V2 CPIE schema (JSON workflow language with llm, api, memory, rag steps)
   - Integrated 8+ LLM providers (OpenAI, Groq, Gemini, WatsonX, Mistral, SambaNova, Cerebras, Novita)
   - Built LangChain + Neo4j GraphRAG pipeline, Milvus vector DB, IBM Cloud Object Storage
   - Multi-tenant provisioning: Azure AD SSO, IBM Cloud Broker, RBAC across orgs
   - GitOps deployment: ArgoCD, GitHub Actions, IBM Cloud IKS, Playwright E2E tests

2. LeedAlways - Backend Developer WBL (Sep 2025 - Present)
   - Architected ECM middleware: Python 3.12 FastAPI, 181 REST endpoints, 26 service modules
   - 8-service Docker Compose stack: Nextcloud, Elasticsearch, MongoDB, MariaDB, Redis, LibreSign
   - Dual-layer auth: Basic Auth + JWT, RBAC, secure env variable isolation
   - OmniScribe: Real-time AI transcription with Whisper, pyannote.audio diarization
   - 3-tier Elasticsearch pipeline, Temporal workflow engine for async job orchestration

3. Vogue Steel Factory LLC - Freelance Frontend Developer
   - High-performance corporate web platform using React 19 and Vite
   - Sticky galleries, micro-animations, responsive layouts for UAE steel fabrication company

PROJECTS & RESEARCH:
1. SamAi - AI Medical Diagnosis System (Python, Scikit-Learn, Flask, Next.js)
   - Breast cancer tumor classification using ML pipelines
   - Research paper "Diagnosis of Breast Cancer Tumor Type" accepted at 7th Int'l Conference (Tbilisi 2024)

2. Ashxcribe - AI-Powered SCRUM Standup Platform
   - Real-time transcription (Web Speech API + Groq Whisper), LLaMA 3.3 70B for document generation
   - Multi-tenant SaaS, Supabase Row-Level Security, Cloudflare Turnstile protection
   - PDF/DOCX/audio export, Vercel deployment with Next.js App Router

3. ALF (Ash Loves Files) - Universal File Converter
   - 120+ formats across 8 categories, no account required, auto-delete after 1 hour
   - FastAPI + Celery + Redis pipeline, Docker Compose, Railway deployment

TECHNICAL SKILLS:
Languages/Frameworks: Python, JavaScript, TypeScript, Node.js, FastAPI, Express.js, React, Next.js
AI/Data: LLMs (LLaMA, GPT, Gemini, Groq, WatsonX, Mistral, SambaNova, Cerebras, Novita), RAG, GraphRAG, LangChain, Neo4j, Whisper, pyannote.audio, HuggingFace, TensorFlow, Scikit-Learn, Computer Vision
Databases/Search: MongoDB, MySQL, PostgreSQL, Redis, Milvus/Zilliz, Elasticsearch, Neo4j
Infra/DevOps: Docker, Nginx, GitHub Actions, GitLab CI/CD, ArgoCD, IBM Cloud, Cloudflare, Linux, Temporal
Security: JWT, OAuth2, Azure AD SSO, HashiCorp Vault, Passport.js, WebSockets, Stripe`;

// Groq API integration
const GroqAPI = {
  async chat(userMessage) {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    console.log("AvatarChat: API key exists:", !!API_KEY);
    console.log("AvatarChat: User message:", userMessage);

    if (!API_KEY) {
      console.error("VITE_GROQ_API_KEY not found in .env");
      return "Please add your Groq API key to Vercel environment variables.";
    }

    try {
      console.log("AvatarChat: Calling Groq API...");
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant on Arshiya Shafizade's personal portfolio site. You speak directly with visitors AND with Arshiya himself.

IMPORTANT RULES:
- Arshiya is male (he/him). Always refer to him by name "Arshiya" or pronouns "he"/"him"/"his". Never use asterisks, never use "*", never use "they", never use placeholders.
- If the current visitor IS Arshiya, address him as "you" / "Arshiya".
- Never output markdown asterisks (*text*, **text**) or role-playing stage directions. Plain spoken English only.
- Keep responses under 120 words, conversational, concise.

RESUME CONTEXT:
${RESUME_CONTEXT}`,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      console.log("AvatarChat: Groq response:", data);

      if (!data.choices?.[0]?.message?.content) {
        console.error("AvatarChat: No valid response from Groq API");
        return "Sorry, I couldn't process that request.";
      }

      const raw = data.choices[0].message.content || "I couldn't process that request.";
      // Strip markdown asterisks and role-play stage directions
      return raw.replace(/\*+/g, "").replace(/\s{2,}/g, " ").trim();
    } catch (error) {
      console.error("AvatarChat: Groq API error:", error);
      console.error("AvatarChat: Error details:", {
        message: error.message,
        status: error.status || "unknown",
      });
      return "Sorry, I'm having trouble connecting right now.";
    }
  },
};

// Main Avatar Chat Component
const AvatarChat = ({ onVisemeUpdate }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [lastUserText, setLastUserText] = useState("");
  const lastHandledRef = useRef("");

  const sendToGroq = async (text) => {
    if (!text?.trim() || isThinking) return;
    const clean = text.trim();
    setLastUserText(clean);
    setAiResponse("");
    setIsThinking(true);
    const response = await GroqAPI.chat(clean);
    setAiResponse(response);
    setConversation((prev) => [...prev, { user: clean, ai: response }]);
    setIsThinking(false);
    setIsSpeaking(true);
    speak(
      response,
      () => {
        setIsSpeaking(false);
        onVisemeUpdate?.(0);
      },
      (level) => onVisemeUpdate?.(level)
    );
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const t = typedText;
    setTypedText("");
    sendToGroq(t);
  };

  const {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening,
    speechSupported,
    speechError,
  } = useSpeechRecognition();
  const { speak } = useTextToSpeech();

  const handleMicClick = () => {
    if (!speechSupported) {
      alert("Voice recognition is not supported. Please use Chrome, Edge, or Safari on desktop.");
      return;
    }
    if (isListening) {
      stopListening();
      return;
    }
    setAiResponse("");
    startListening();
  };

  // When listening ends with a final transcript, send it to Groq
  useEffect(() => {
    if (isThinking) return;
    const text = finalTranscript?.trim();
    if (!text || text === lastHandledRef.current) return;
    lastHandledRef.current = text;
    sendToGroq(text);
  }, [finalTranscript, isThinking]);

  // Viseme is driven directly from SpeechSynthesis word boundaries in sendToGroq/speak

  return (
    <div className="absolute bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] pointer-events-auto flex flex-col items-end gap-3">
      {/* Transcript/AI response — lives above the bar as a sibling so it never overlaps */}
      <AnimatePresence mode="wait">
        {(lastUserText || aiResponse || isThinking || speechError || (isListening && transcript)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full max-w-lg"
          >
            <div className="bg-[rgba(9,9,31,0.92)] backdrop-blur-lg rounded-2xl border border-white/10 px-4 py-3 shadow-xl">
              {isListening && transcript && (
                <>
                  <div className="text-red-300/80 text-xs uppercase tracking-wide mb-1">Listening…</div>
                  <div className="text-white/80 text-sm mb-2 italic break-words">{transcript}</div>
                </>
              )}
              {speechError && !isListening && (
                <div className="text-red-300/90 text-xs mb-2">{speechError}</div>
              )}
              {lastUserText && (
                <div className="text-white/60 text-xs uppercase tracking-wide mb-1">You</div>
              )}
              {lastUserText && (
                <div className="text-white/90 text-sm mb-2 break-words">{lastUserText}</div>
              )}
              {(aiResponse || isThinking) && (
                <div className="text-cyan-300/70 text-xs uppercase tracking-wide mb-1">Arshiya</div>
              )}
              {isThinking && !aiResponse && (
                <div className="text-cyan-300/80 text-sm italic">Thinking…</div>
              )}
              {aiResponse && (
                <div className="text-cyan-200/95 text-sm break-words leading-relaxed">{aiResponse}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center gap-3 bg-[rgba(9,9,31,0.85)] backdrop-blur-xl rounded-full border border-white/10 p-2"
      >
        {/* Mic button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMicClick}
          disabled={!speechSupported}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${!speechSupported
              ? "opacity-50 cursor-not-allowed"
              : ""
            } ${
              isListening || isSpeaking
                ? "bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            border transition-all duration-300 backdrop-blur-md
          `}
        >
          <motion.div
            animate={isListening || isSpeaking ? { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] } : {}}
            transition={{ duration: 1, repeat: isListening || isSpeaking ? Infinity : 0 }}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center
              ${isListening || isSpeaking
                ? "bg-gradient-to-br from-red-500 to-pink-500"
                : "bg-gradient-to-br from-purple-500 to-indigo-500"
              }
            `}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </motion.div>
        </motion.button>

        {/* Text input fallback */}
        <form onSubmit={handleTextSubmit} className="flex-1 flex items-center gap-2 pr-2">
          <input
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder={
              isThinking ? "Thinking..." :
              isSpeaking ? "Speaking..." :
              isListening ? "Listening..." :
              "Type or tap mic to ask..."
            }
            disabled={isThinking}
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 outline-none px-2 py-2 min-w-0"
          />
          <button
            type="submit"
            disabled={!typedText.trim() || isThinking}
            className="text-white/70 hover:text-white disabled:opacity-30 text-xs font-medium px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            Send
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default AvatarChat;
