"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  Search,
  Activity,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function CodeRain() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const columns = [
    [
      "> verify_source(reuters.com)",
      "> checking source credibility...",
      "> evidence located",
      "> trust score = 91",
    ],
    [
      "> fact_check(headline)",
      "> scanning global reports...",
      "> conflicting claims = none",
      "> authenticity confirmed",
    ],
    [
      "> validate_claim(statement)",
      "> searching references...",
      "> analyzing context...",
      "> truth confidence = 88",
    ],
    [
      "> cross_reference(news_db)",
      "> querying archive...",
      "> matching reports found",
      "> confidence boosted",
    ],
    [
      "> detect_bias(content)",
      "> sentiment analysis running...",
      "> manipulation risk = low",
      "> source accepted",
    ],
    [
      "> trace_origin(post)",
      "> locating primary publisher...",
      "> origin verified",
      "> source chain intact",
    ],
  ];

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* soft spotlight */}
      <motion.div
        animate={{
          x: mouse.x - 250,
          y: mouse.y - 250,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-green-400/6 blur-3xl"
      />

      {/* terminal scan columns */}
      <div className="absolute inset-0 flex justify-around px-10 opacity-35">
        {columns.map((lines, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
            }}
            className="font-mono text-[11px] md:text-xs text-green-300 leading-7 whitespace-pre"
            style={{
              textShadow: "0 0 10px rgba(0,255,120,0.28)",
            }}
          >
            <TypeAnimation
              sequence={[
                lines[0],
                500,
                "\n" + lines[0] + "\n" + lines[1],
                500,
                "\n" + lines[0] + "\n" + lines[1] + "\n" + lines[2],
                500,
                "\n" +
                lines[0] +
                "\n" +
                lines[1] +
                "\n" +
                lines[2] +
                "\n" +
                lines[3],
                1800,
                "",
                400,
              ]}
              speed={85}
              repeat={Infinity}
              cursor={false}
              style={{ whiteSpace: "pre-line" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef<HTMLDivElement | null>(null);

  const analyzeNews = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      setTimeout(() => {
        setResult(data);
        setLoading(false);

        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }, 2500);
    } catch {
      setLoading(false);

      setResult({
        verdict: "ERROR",
        confidence: 0,
        explanation: "Connection to AI backend failed.",
      });
    }
  };

  const verdictType = () => {
    if (!result) return "uncertain";

    const verdict = result.verdict.toLowerCase();

    if (verdict.includes("fake")) return "fake";
    if (verdict.includes("real")) return "real";

    return "uncertain";
  };

  const type = verdictType();

  const verdictConfig = {
    fake: {
      title: "⚠ THREAT DETECTED",
      subtitle: "FAKE NEWS",
      color: "text-red-400",
      glow: "shadow-red-500/50",
      border: "border-red-500/30",
      bg: "from-red-500/20 to-transparent",
      icon: <ShieldAlert size={40} />,
    },

    real: {
      title: "✓ VERIFIED SOURCE",
      subtitle: "REAL NEWS",
      color: "text-green-400",
      glow: "shadow-green-500/50",
      border: "border-green-500/30",
      bg: "from-green-500/20 to-transparent",
      icon: <ShieldCheck size={40} />,
    },

    uncertain: {
      title: "? NEWS UNCLEAR",
      subtitle: "UNCERTAIN",
      color: "text-yellow-300",
      glow: "shadow-yellow-500/50",
      border: "border-yellow-500/30",
      bg: "from-yellow-500/20 to-transparent",
      icon: <HelpCircle size={40} />,
    },
  };

  const current = verdictConfig[type];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <CodeRain />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,150,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* SCANLINES */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,255,100,0.06)_100%)] bg-[size:100%_4px] opacity-30 animate-pulse" />

      {/* FLOATING BLOBS */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full bg-green-500/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-cyan-500/20 blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            animate={{
              textShadow: [
                "0 0 10px rgba(0,255,150,0.3)",
                "0 0 25px rgba(0,255,150,0.8)",
                "0 0 10px rgba(0,255,150,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl md:text-8xl font-black tracking-tight text-green-400"
          >
            FAKE NEWS
          </motion.h1>

          <h2 className="text-5xl md:text-6xl font-black text-white mt-2">
            DETECTOR
          </h2>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            AI-powered misinformation threat analysis system
          </p>
        </motion.div>

        {/* INPUT PANEL */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-14 border border-green-500/20 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,100,0.08)]"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste suspicious article, headline, or social media claim..."
            className="w-full h-60 rounded-2xl bg-black/40 border border-green-500/20 p-6 text-lg text-green-100 outline-none resize-none focus:ring-2 focus:ring-green-400 shadow-inner"
          />

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 30px rgba(0,255,120,0.35)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={analyzeNews}
            disabled={loading}
            className="mt-6 w-full rounded-2xl border border-green-400/30 bg-green-500/10 backdrop-blur-xl py-5 text-xl font-bold tracking-wide flex items-center justify-center gap-4 text-green-300"
          >
            <Search size={26} />
            {loading ? "SCANNING THREAT..." : "ANALYZE THREAT"}
          </motion.button>
        </motion.div>

        {/* LOADING STATE */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/5 backdrop-blur-xl p-10 text-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-b-2 border-green-400"
                  />
                  <Activity className="absolute inset-0 m-auto text-green-400 animate-pulse" size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-mono font-bold tracking-[0.2em] text-green-400">
                    Checking NEWS...
                  </p>
                  <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    AI Pattern Recognition in progress
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULT SECTION */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-10 rounded-3xl border ${current.border} bg-black/60 backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] ${current.glow}`}
            >
              <div className={`h-1 bg-gradient-to-r ${current.bg}`} />

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className={`p-5 rounded-2xl bg-black/40 border ${current.border} ${current.color}`}>
                      {current.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-mono font-bold tracking-[0.3em] uppercase ${current.color} opacity-70`}>
                        Analysis Verdict
                      </p>
                      <h3 className="text-4xl font-black mt-1 tracking-tight">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-mono font-bold tracking-[0.3em] text-zinc-500 uppercase mb-2">
                      Confidence
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-black ${current.color}`}>
                        {result.confidence}
                      </span>
                      <span className="text-2xl font-bold text-zinc-600">%</span>
                    </div>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-10 w-full h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${current.bg} border-r-2 border-white/50`}
                  />
                </div>

                {/* EXPLANATION */}
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" size={20} />
                    <h4 className="text-lg font-mono font-bold tracking-widest text-zinc-400 uppercase">
                      Intelligence Briefing
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-8 font-mono leading-relaxed text-zinc-300">
                    <TypeAnimation
                      sequence={[result.explanation]}
                      wrapper="p"
                      speed={70}
                      cursor={true}
                      className="text-lg md:text-xl"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
                  <span>System: Neural-Link v4.2</span>
                  <span>Encryption: AES-256 Verified</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}