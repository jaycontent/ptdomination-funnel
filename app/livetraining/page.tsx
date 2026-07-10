"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { calculateTimeRemaining, getNextWebinarDate } from "@/lib/date";

const webinar = getNextWebinarDate();
const LIVE_CLASS_DATE = webinar.iso;

// Shared typewriter animation hook
function useTypewriterCycle(
  prompt: string,
  badOutput: string,
  goodOutput: string
) {
  const [phase, setPhase] = useState<"typing" | "bad" | "transform" | "good">("typing");
  const [typedText, setTypedText] = useState("");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const runCycle = () => {
      setPhase("typing");
      setTypedText("");
      setDisplayText("");
      charIndex = 0;

      const typePrompt = () => {
        if (charIndex < prompt.length) {
          setTypedText(prompt.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typePrompt, 55);
        } else {
          timeout = setTimeout(() => {
            setPhase("bad");
            let badIdx = 0;
            const typeBad = () => {
              if (badIdx < badOutput.length) {
                setDisplayText(badOutput.slice(0, badIdx + 1));
                badIdx++;
                timeout = setTimeout(typeBad, 22);
              } else {
                timeout = setTimeout(() => {
                  setPhase("transform");
                  timeout = setTimeout(() => {
                    setPhase("good");
                    let goodIdx = 0;
                    setDisplayText("");
                    const typeGood = () => {
                      if (goodIdx < goodOutput.length) {
                        setDisplayText(goodOutput.slice(0, goodIdx + 1));
                        goodIdx++;
                        timeout = setTimeout(typeGood, 40);
                      } else {
                        timeout = setTimeout(runCycle, 2600);
                      }
                    };
                    typeGood();
                  }, 500);
                }, 1000);
              }
            };
            typeBad();
          }, 300);
        }
      };
      typePrompt();
    };

    runCycle();
    return () => clearTimeout(timeout);
  }, []);

  return { phase, typedText, displayText };
}

// Bullet 1: AI content — generic slop vs converting hook
function AIContentAnimation() {
  const { phase, typedText, displayText } = useTypewriterCycle(
    "Write a fitness hook",
    "Here are 5 generic tips to improve your fitness routine...",
    "Stop counting reps. Start counting clients."
  );

  return (
    <div className="flex-shrink-0 w-[84px] h-[84px] relative">
      <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0d1221 0%, #0a1628 100%)", border: "1px solid rgba(0,159,238,0.3)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 30%, rgba(0,159,238,0.4), transparent 70%)" }} />
        <div className="absolute top-3 left-3 right-3">
          <div className="flex items-center gap-1 mb-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#009fee" }} />
            <div className="text-white leading-none overflow-hidden whitespace-nowrap" style={{ fontSize: "6px", maxWidth: "60px" }}>
              {typedText}
              {phase === "typing" && <span className="inline-block w-px ml-px align-middle animate-pulse" style={{ background: "#009fee", height: "7px" }} />}
            </div>
          </div>
          <div className="h-px w-full opacity-30" style={{ background: "#009fee" }} />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          {phase === "bad" && (
            <div className="leading-tight" style={{ fontSize: "5px", color: "#94a3b8", lineHeight: "1.5" }}>{displayText}</div>
          )}
          {phase === "transform" && (
            <div className="flex items-center justify-center h-6">
              <div className="w-4 h-4 rounded-full animate-ping" style={{ background: "rgba(0,159,238,0.5)" }} />
            </div>
          )}
          {phase === "good" && (
            <div className="font-bold leading-tight" style={{ fontSize: "5.5px", color: "#009fee", lineHeight: "1.5" }}>{displayText}</div>
          )}
        </div>
        {phase === "good" && (
          <>
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#fbbf24" }} />
            <div className="absolute top-3 right-4 w-1 h-1 rounded-full animate-pulse" style={{ background: "#fbbf24", animationDelay: "0.3s" }} />
          </>
        )}
      </div>
    </div>
  );
}

// Bullet 2: Personal brand — generic vs premium positioning
function PersonalBrandAnimation() {
  const [tick, setTick] = useState(0);
  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setShowPremium(false);
      timeout = setTimeout(() => {
        setShowPremium(true);
        timeout = setTimeout(cycle, 3000);
      }, 2500);
    };
    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const bars = [40, 55, 35, 65, 50, 70, 45];

  return (
    <div className="flex-shrink-0 w-[84px] h-[84px] relative">
      <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0d1221 0%, #0a1628 100%)", border: "1px solid rgba(0,159,238,0.3)" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,159,238,0.5), transparent 70%)" }} />

        {/* Two-panel: before/after */}
        <div className="absolute inset-0 flex">
          {/* Before panel */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1 border-r border-white/10 p-1.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#1e293b" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#475569" }} />
            </div>
            <div className="space-y-0.5 w-full px-0.5">
              {[60, 40, 50].map((w, i) => (
                <div key={i} className="h-1 rounded-full" style={{ background: "#334155", width: `${w}%` }} />
              ))}
            </div>
            <div className="text-center" style={{ fontSize: "4px", color: "#64748b" }}>Generic</div>
          </div>

          {/* After panel */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1 p-1.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: showPremium ? "rgba(0,159,238,0.15)" : "#1e293b", border: showPremium ? "1.5px solid rgba(0,159,238,0.6)" : "1.5px solid transparent", transition: "all 0.6s ease" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: showPremium ? "#009fee" : "#475569", transition: "all 0.6s ease" }} />
            </div>
            <div className="space-y-0.5 w-full px-0.5">
              {[90, 75, 85].map((w, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-700" style={{ background: showPremium ? "#009fee" : "#334155", width: showPremium ? `${w}%` : "30%", opacity: showPremium ? 1 : 0.4 }} />
              ))}
            </div>
            <div className="text-center transition-colors duration-500" style={{ fontSize: "4px", color: showPremium ? "#009fee" : "#64748b" }}>Premium</div>
          </div>
        </div>

        {/* Arrow in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#0d1221", border: "1px solid rgba(0,159,238,0.4)" }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 4h4M4 2l2 2-2 2" stroke="#009fee" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bullet 3: Instagram followers → booked sales calls
function IGToCallsAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3];
    let i = 0;
    const advance = () => {
      i = (i + 1) % 4;
      setStep(i);
    };
    const id = setInterval(advance, 900);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { label: "Reel", icon: "▶", color: "#009fee", x: 8, y: 28 },
    { label: "Story", icon: "◉", color: "#38bdf8", x: 8, y: 52 },
    { label: "DM", icon: "✉", color: "#0ea5e9", x: 38, y: 40 },
    { label: "Call", icon: "📞", color: "#22c55e", x: 64, y: 40 },
  ];

  return (
    <div className="flex-shrink-0 w-[84px] h-[84px] relative">
      <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0d1221 0%, #0a1628 100%)", border: "1px solid rgba(0,159,238,0.3)" }}>
        <svg width="84" height="84" viewBox="0 0 84 84" className="absolute inset-0">
          {/* Lines between nodes */}
          <line x1="20" y1="34" x2="38" y2="44" stroke="#009fee" strokeWidth="0.8" strokeOpacity={step >= 1 ? 0.8 : 0.15} style={{ transition: "stroke-opacity 0.4s" }} />
          <line x1="20" y1="56" x2="38" y2="46" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity={step >= 1 ? 0.8 : 0.15} style={{ transition: "stroke-opacity 0.4s" }} />
          <line x1="48" y1="44" x2="64" y2="44" stroke="#22c55e" strokeWidth="0.8" strokeOpacity={step >= 2 ? 0.8 : 0.15} style={{ transition: "stroke-opacity 0.4s" }} />

          {/* Traveling dot on line 1 */}
          {step === 1 && <circle cx="30" cy="39" r="1.5" fill="#009fee"><animate attributeName="cx" from="20" to="38" dur="0.8s" repeatCount="1" /></circle>}
          {step === 2 && <circle cx="56" cy="44" r="1.5" fill="#22c55e"><animate attributeName="cx" from="48" to="64" dur="0.8s" repeatCount="1" /></circle>}
        </svg>

        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)", transition: "all 0.4s" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{
                fontSize: "8px",
                background: i <= step ? n.color : "#1e293b",
                boxShadow: i <= step ? `0 0 6px ${n.color}60` : "none",
                transition: "all 0.4s",
                border: `1px solid ${i <= step ? n.color : "#334155"}`,
              }}
            >
              {n.icon}
            </div>
            <div style={{ fontSize: "4px", color: i <= step ? n.color : "#475569", marginTop: "2px", transition: "color 0.4s" }}>{n.label}</div>
          </div>
        ))}

        {/* "Booked" badge */}
        {step === 3 && (
          <div
            className="absolute bottom-2 right-2 rounded px-1 py-0.5"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.5)", fontSize: "4px", color: "#22c55e" }}
          >
            Booked ✓
          </div>
        )}
      </div>
    </div>
  );
}

// Bullet 4: $64K → $95K revenue growth animation
function RevenueGrowthAnimation() {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setProgress(0);
      setShowResult(false);
      let p = 0;
      const grow = () => {
        if (p < 100) {
          p += 2;
          setProgress(p);
          timeout = setTimeout(grow, 30);
        } else {
          setShowResult(true);
          timeout = setTimeout(cycle, 2800);
        }
      };
      timeout = setTimeout(grow, 400);
    };
    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const currentValue = Math.round(64 + (95 - 64) * (progress / 100));
  const bars = [
    { month: "Jan", pct: 42 },
    { month: "Feb", pct: 55 },
    { month: "Mar", pct: 68 },
    { month: "Apr", pct: 82 },
    { month: "May", pct: 100 },
  ];

  return (
    <div className="flex-shrink-0 w-[84px] h-[84px] relative">
      <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0d1221 0%, #0a1628 100%)", border: "1px solid rgba(0,159,238,0.3)" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 50% 80%, rgba(34,197,94,0.4), transparent 70%)" }} />

        {/* Value display */}
        <div className="absolute top-2.5 left-3 right-3 flex items-baseline justify-between">
          <div style={{ fontSize: "7px", color: "#94a3b8" }}>Revenue</div>
          <div className="font-bold" style={{ fontSize: "8px", color: showResult ? "#22c55e" : "#009fee", transition: "color 0.5s" }}>
            ${currentValue}K
          </div>
        </div>

        {/* Bar chart */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1" style={{ height: "40px" }}>
          {bars.map((bar, i) => {
            const filledPct = Math.min(100, Math.max(0, (progress - i * 20) * 5));
            const height = Math.round((bar.pct / 100) * 36 * (filledPct / 100));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${height}px`,
                    background: i === 4 && showResult ? "#22c55e" : "#009fee",
                    opacity: filledPct > 0 ? 0.85 : 0.15,
                    transition: "height 0.1s, background 0.5s",
                    minHeight: "1px",
                  }}
                />
                <div style={{ fontSize: "3.5px", color: "#475569" }}>{bar.month}</div>
              </div>
            );
          })}
        </div>

        {showResult && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 rounded-full animate-ping" style={{ background: "rgba(34,197,94,0.6)" }} />
          </div>
        )}
      </div>
    </div>
  );
}


function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    type P = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean; ph: number };
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.6 + 0.7,
      hot: Math.random() < 0.18,
      ph: Math.random() * Math.PI * 2,
    }));

    // Drifting aurora blobs
    const blobs = [
      { bx: 0.22, by: 0.35, dvx: 0.00028, dvy: 0.00018 },
      { bx: 0.72, by: 0.55, dvx: -0.00022, dvy: 0.00025 },
      { bx: 0.48, by: 0.12, dvx: 0.00035, dvy: -0.00015 },
    ];

    // Horizontal data-stream scanlines
    const streams: { y: number; x: number; speed: number; len: number; alpha: number }[] = Array.from({ length: 6 }, () => ({
      y: Math.random() * H,
      x: Math.random() * W,
      speed: 0.6 + Math.random() * 1.2,
      len: 60 + Math.random() * 120,
      alpha: 0.06 + Math.random() * 0.08,
    }));

    let t = 0;

    const draw = () => {
      t += 0.013;
      ctx.clearRect(0, 0, W, H);

      // Aurora blobs
      blobs.forEach(b => {
        b.bx = ((b.bx + b.dvx) % 1 + 1) % 1;
        b.by = ((b.by + b.dvy) % 1 + 1) % 1;
        const gx = b.bx * W, gy = b.by * H;
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.5);
        g.addColorStop(0, "rgba(0,159,238,0.10)");
        g.addColorStop(0.45, "rgba(0,90,180,0.04)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Data streams
      streams.forEach(s => {
        s.x += s.speed;
        if (s.x > W + s.len) s.x = -s.len;
        const sg = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        sg.addColorStop(0, "rgba(0,255,255,0)");
        sg.addColorStop(0.5, `rgba(0,255,255,${s.alpha})`);
        sg.addColorStop(1, "rgba(0,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update particles
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        p.ph += 0.028;
      });

      // Connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            const a = (1 - d / 115) * 0.2;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,175,238,${a})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Particles
      pts.forEach(p => {
        const pulse = 0.5 + 0.5 * Math.sin(p.ph);
        if (p.hot) {
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 9);
          gr.addColorStop(0, `rgba(0,255,255,${0.13 * pulse})`);
          gr.addColorStop(1, "rgba(0,255,255,0)");
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
          ctx.fillStyle = gr; ctx.fill();

          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3 + pulse * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,255,255,${0.28 * pulse})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hot
          ? `rgba(0,255,255,${0.75 + 0.25 * pulse})`
          : `rgba(0,159,238,${0.5 + 0.25 * pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

export default function LiveTrainingPage() {
  const router = useRouter();
  const ctaRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: true,
  });
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
  });
  const [pagePath, setPagePath] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
    });
    setPagePath(window.location.pathname);
  }, []);

  useEffect(() => {
    const update = () => setCountdown(calculateTimeRemaining(LIVE_CLASS_DATE));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "PageView");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    let ok = false;
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          sms_consent: form.consent,
          webinar_datetime: webinar.iso,
          page_path: pagePath,
          ...utmParams,
        }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    setSubmitting(false);
    if (!ok) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }
    router.push("/livetraining/confirmation");
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      <Script id="fb-page-view" strategy="afterInteractive">{`if(typeof fbq === 'function') { fbq('track','PageView'); }`}</Script>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 159, 238, 0.45); }
          50% { box-shadow: 0 0 0 14px rgba(0, 255, 255, 0); }
        }
        .pulse-btn {
          animation: pulse-glow 2.2s infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fade-in-up 0.7s ease both;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.55s; }
        wistia-player {
          width: 100%;
          display: block;
        }
        .accent-text {
          background: linear-gradient(90deg, #009fee, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .accent-btn {
          background: linear-gradient(90deg, #009fee, #00FFFF);
          color: #000;
        }
        .accent-btn:hover {
          filter: brightness(1.1);
        }
        .accent-dot {
          background: linear-gradient(135deg, #009fee, #00FFFF);
        }
        .accent-border {
          border-color: rgba(0, 159, 238, 0.4);
          background: rgba(0, 159, 238, 0.1);
        }
        .form-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          border-radius: 10px;
          padding: 12px 16px;
          width: 100%;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: #009fee;
          background: rgba(0, 159, 238, 0.07);
        }
        .form-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        @media (min-width: 1024px) {
          .page-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            min-height: calc(100vh - 40px);
            align-items: start;
          }
          .scroll-col {
            overflow-y: auto;
          }
          .sticky-col {
            position: sticky;
            top: 0;
            height: calc(100vh - 40px);
            display: flex;
            align-items: center;
            padding: 24px;
            border-left: 1px solid rgba(255,255,255,0.08);
            background: #0d1221;
          }
        }
      `}</style>

      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />

      {/* Top Bar with Countdown */}
      <div
        className="w-full text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 sm:gap-3"
        style={{ background: "#0d1221" }}
      >
        {countdown.isExpired ? (
          <span className="font-bold uppercase">Live Class Is Starting — Reserve Your Spot Now</span>
        ) : (
          <>
            <span className="uppercase tracking-wider font-bold hidden sm:inline">Registrations Closing In:</span>
            <span className="uppercase tracking-wider font-bold sm:hidden">Closing In:</span>
            <span className="inline-flex items-center gap-1 font-mono font-bold text-sm">
              <span>{pad(countdown.days)}<span className="text-[10px] font-semibold ml-0.5 opacity-60">d</span></span>
              <span className="opacity-40">:</span>
              <span>{pad(countdown.hours)}<span className="text-[10px] font-semibold ml-0.5 opacity-60">h</span></span>
              <span className="opacity-40">:</span>
              <span>{pad(countdown.minutes)}<span className="text-[10px] font-semibold ml-0.5 opacity-60">m</span></span>
              <span className="opacity-40">:</span>
              <span>{pad(countdown.seconds)}<span className="text-[10px] font-semibold ml-0.5 opacity-60">s</span></span>
            </span>
          </>
        )}
      </div>

      <div className="page-layout">
        {/* LEFT / SCROLL COLUMN */}
        <div className="scroll-col">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <HeroCanvas />
            {/* bottom fade into page bg */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, #0a0e1a)" }}
            />
            <section className="relative z-10 max-w-2xl mx-auto px-5 pt-12 pb-10 fade-in-up">
            <div className="flex mb-6 delay-1 fade-in-up">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2" style={{ background: "rgba(0,159,238,0.08)", border: "1px solid rgba(0,159,238,0.25)" }}>
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#ff4444" }}></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#ff4444" }}></span>
                </span>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#009fee" }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                <span className="text-sm font-semibold tracking-wide text-white">Live on Zoom &nbsp;·&nbsp; {webinar.shortDisplay} &nbsp;·&nbsp; 4:30 PM PST / 7:30 PM EST</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] sm:leading-tight tracking-tight mb-4 delay-2 fade-in-up">
              How Online Fitness Coaches Are Using AI to Add{" "}
              <span className="accent-text">$1K–$2K/Week</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl leading-snug sm:leading-relaxed mb-8 delay-3 fade-in-up">
              Free 60-Minute Masterclass: The exact frameworks used by 12,000+ coaches to leverage AI to get more clients on autopilot.
            </p>

            {/* Wistia Video Embed */}
            <Script src="https://fast.wistia.com/embed/vyb213sif8.js" strategy="afterInteractive" />
            <div className="w-full rounded-xl overflow-hidden shadow-2xl delay-4 fade-in-up" style={{ background: '#0d1221' }}>
              {/* @ts-ignore */}
              <wistia-player media-id="vyb213sif8" aspect="1.7777777777777777"></wistia-player>
            </div>

            {/* Mobile post-video CTA */}
            <button
              onClick={scrollToCTA}
              className="lg:hidden pulse-btn accent-btn w-full rounded-xl mt-5 px-6 py-4 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 shadow-lg"
            >
              <span className="font-extrabold text-lg tracking-wide leading-tight">Register Now</span>
              <span className="font-normal text-xs opacity-80 tracking-wide">Free 60-Minute Masterclass</span>
            </button>

            {/* What You'll Learn */}
            <section className="mt-8 -mx-5 bg-[#0d1221] border-y border-white/10 py-10 px-5">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
                  What You'll Learn
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4">
                    <AIContentAnimation />
                    <p className="text-slate-200 text-sm sm:text-base leading-snug">How to use AI to create content that actually converts — not generic ChatGPT slop</p>
                  </li>
                  <li className="flex items-center gap-4">
                    <PersonalBrandAnimation />
                    <p className="text-slate-200 text-sm sm:text-base leading-snug">The personal branding framework that separates coaches who thrive from coaches who get left behind</p>
                  </li>
                  <li className="flex items-center gap-4">
                    <IGToCallsAnimation />
                    <p className="text-slate-200 text-sm sm:text-base leading-snug">How to turn Instagram followers into booked sales calls for your high-ticket offer</p>
                  </li>
                  <li className="flex items-center gap-4">
                    <RevenueGrowthAnimation />
                    <p className="text-slate-200 text-sm sm:text-base leading-snug">The exact AI workflows one client used to go from $64K to $95K/month</p>
                  </li>
                </ul>
              </div>
            </section>

            <button
              onClick={scrollToCTA}
              className="pulse-btn accent-btn lg:hidden inline-block font-extrabold text-lg sm:text-xl px-10 py-5 rounded-xl transition-all duration-200 tracking-wide shadow-lg w-full text-center mt-6"
            >
              Reserve My Free Spot →
            </button>
          </section>
          </div>

          {/* Urgency Block */}
          <section className="bg-[#111827] py-12 px-5">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed border-l-4 pl-5 text-left italic" style={{ borderColor: "#009fee" }}>
                "The fitness coaching industry just changed — again. AI is the biggest shift since the internet. Coaches who don't adapt now will be left behind in the next 12–24 months. This masterclass shows you how to get on the right side of it."
              </p>
            </div>
          </section>

          {/* Bonuses */}
          <section className="py-14 px-5">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                Attend the Masterclass &amp; Get These{" "}
                <span className="accent-text">FREE Bonuses</span>
              </h2>
              <p className="text-slate-400 text-center mb-10 text-sm uppercase tracking-widest">
                Included when you reserve your spot today
              </p>
              <div className="space-y-5">
                {[
                  {
                    label: "BONUS 1",
                    title: "90-Minute DM Sales Training",
                    desc: "Recorded live at a private event — the exact DM framework our top coaches use to close high-ticket clients without feeling pushy.",
                  },
                  {
                    label: "BONUS 2",
                    title: "Full Masterclass Slide Deck",
                    desc: "The complete reference deck from this training so you can revisit every framework and strategy at any time.",
                  },
                ].map((bonus, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg accent-border border flex items-center justify-center">
                      <span className="accent-text font-bold text-xs">{bonus.label.split(" ")[1]}</span>
                    </div>
                    <div>
                      <p className="text-xs accent-text font-semibold uppercase tracking-widest mb-1">{bonus.label}</p>
                      <h3 className="font-bold text-white text-base sm:text-lg mb-1">{bonus.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{bonus.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Not For You */}
          <section className="py-14 px-5 border-t border-white/10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                Do <span className="text-red-400">Not</span> Register If…
              </h2>
              <div className="flex flex-col gap-5">
                {[
                  "You aren't a fitness trainer ready to add clients to your roster.",
                  "You don't have time or money to grow your business.",
                  `You're not dedicated enough to your business to actually show up to the live class on ${webinar.dayName}.`,
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-[#0d1221] border border-white/10 rounded-xl px-5 py-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2L8 8M8 2L2 8" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mobile CTA */}
          <section
            ref={ctaRef as React.RefObject<HTMLElement>}
            className="lg:hidden bg-[#0d1221] border-t border-white/10 py-16 px-5 text-center"
          >
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Save Your <span className="accent-text">Free Spot</span>
              </h2>
              <p className="text-slate-400 text-sm mb-6">{webinar.shortDisplay} · 4:30 PM PST / 7:30 PM EST</p>
              <RegistrationForm
                form={form}
                setForm={setForm}
                submitting={submitting}
                submitError={submitError}
                onSubmit={handleSubmit}
              />
            </div>
          </section>
        </div>

        {/* RIGHT / STICKY FORM COLUMN — desktop only */}
        <div className="sticky-col hidden lg:flex">
          <div className="w-full">
            <div className="mb-5 text-center">
              <h2 className="text-xl font-extrabold mb-2">
                Save Your <span className="accent-text">Free Spot</span>
              </h2>
              <p className="text-slate-400 text-sm">{webinar.shortDisplay} · 4:30 PM PST / 7:30 PM EST</p>
            </div>
            <RegistrationForm
              form={form}
              setForm={setForm}
              submitting={submitting}
              submitError={submitError}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

function RegistrationForm({
  form,
  setForm,
  submitting,
  submitError,
  onSubmit,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">First Name</label>
          <input
            type="text"
            required
            placeholder="Jane"
            className="form-input"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Last Name</label>
          <input
            type="text"
            required
            placeholder="Smith"
            className="form-input"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
        <input
          type="email"
          required
          placeholder="jane@example.com"
          className="form-input"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
        <input
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          className="form-input"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>

      <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex-shrink-0 mt-0.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={form.consent}
            onClick={() => setForm((f) => ({ ...f, consent: !f.consent }))}
            className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-150 flex-shrink-0"
            style={form.consent ? { background: "linear-gradient(135deg, #009fee, #00FFFF)", borderColor: "#009fee" } : { background: "transparent", borderColor: "rgba(255,255,255,0.3)" }}
          >
            {form.consent && (
              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          I consent to receive automated marketing and promotional text messages (including SMS and MMS) from PT Domination at the phone number provided above. I understand that consent is not a condition of purchase, message frequency varies, and message and data rates may apply. I can reply STOP to unsubscribe at any time. For help, reply HELP. View our{" "}
          <a href="https://pt-domination.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="underline text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
          {" "}and{" "}
          <a href="https://pt-domination.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="underline text-slate-300 hover:text-white transition-colors">Terms of Service</a>.
        </p>
      </div>

      {submitError && (
        <p className="text-red-400 text-sm text-center">{submitError}</p>
      )}
      <button
        type="submit"
        disabled={submitting || !form.consent}
        className="pulse-btn accent-btn w-full font-extrabold text-base py-4 rounded-xl transition-all duration-200 tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:animation-none mt-1"
      >
        {submitting ? "Registering..." : "Register Now →"}
      </button>

      <p className="text-center text-slate-500 text-xs pt-1">No credit card required. 100% free training.</p>
    </form>
  );
}
