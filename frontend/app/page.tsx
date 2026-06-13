"use client";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";

function StarField() {
  const stars = useMemo(() => (
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      w: i % 15 === 0 ? 3.5 : i % 6 === 0 ? 2.5 : (((i * 7 + 13) % 12) / 10 + 0.8).toFixed(1),
      top: (((i * 37 + 11) % 1000) / 10).toFixed(1),
      left: (((i * 53 + 7) % 1000) / 10).toFixed(1),
      dur: (((i * 11 + 5) % 30) / 10 + 1.5).toFixed(1),
      delay: (((i * 17 + 3) % 50) / 10).toFixed(1),
      tint: i % 20 === 0 ? 'aurora' : i % 25 === 0 ? 'cosmic' : 'white',
    }))
  ), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {stars.map((s) => (
        <div key={s.id} className={`star star-${s.tint}`} style={{
          width: `${s.w}px`,
          height: `${s.w}px`,
          top: `${s.top}%`,
          left: `${s.left}%`,
          ['--d' as string]: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

const CYCLE_DURATION = 3200;

function CyclingHeadline() {
  const [phase, setPhase] = useState<'headline' | 'brand' | 'exit-headline' | 'exit-brand'>('headline');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      timeout = setTimeout(() => {
        setPhase('exit-headline');
        timeout = setTimeout(() => {
          setPhase('brand');
          timeout = setTimeout(() => {
            setPhase('exit-brand');
            timeout = setTimeout(() => {
              setPhase('headline');
              cycle();
            }, 500);
          }, CYCLE_DURATION);
        }, 500);
      }, CYCLE_DURATION);
    };
    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const isHeadline = phase === 'headline' || phase === 'exit-headline';
  const exiting    = phase === 'exit-headline' || phase === 'exit-brand';
  const tx = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)';

  return (
    <div style={{
      height: '280px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1 className="font-bold text-center" style={{
        fontSize: 'clamp(2.4rem, 6.5vw, 4.5rem)',
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        position: 'absolute',
        width: '100%',
        transition: tx,
        opacity: isHeadline ? (exiting ? 0 : 1) : 0,
        transform: isHeadline ? (exiting ? 'translateY(-20px)' : 'translateY(0)') : 'translateY(20px)',
        pointerEvents: isHeadline ? 'auto' : 'none',
      }}>
        What is happening{' '}
        <span className="glow-solar" style={{ color: 'var(--solar)' }}>above you</span>
        <br />right now?
      </h1>

      {/* Brand */}
      <div style={{
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        transition: tx,
        opacity: !isHeadline ? (exiting ? 0 : 1) : 0,
        transform: !isHeadline ? (exiting ? 'translateY(-20px) scale(0.97)' : 'translateY(0) scale(1)') : 'translateY(20px) scale(0.97)',
        pointerEvents: !isHeadline ? 'auto' : 'none',
      }}>
        <p className="brand-pulse" style={{
          fontSize: 'clamp(2.6rem, 7vw, 5rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}>
          SpacePulse<span style={{ color: 'var(--aurora)' }}> AI</span>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-col items-center px-6 overflow-hidden"
      style={{ minHeight: '100svh' }}>

      <div className="aurora-bg"><div className="aurora-solar" /></div>
      <StarField />

      {/* Equal spacer top */}
      <div className="flex-1 z-10" />

      {/* Content block */}
      <div className="relative z-10 text-center max-w-3xl w-full">

        <p className="fade-up-1 label-mono mb-6" style={{ color: 'var(--aurora)' }}>
          Real-Time Space Intelligence
        </p>

        <div className="fade-up-2 mb-6">
          <CyclingHeadline />
        </div>

        <p className="fade-up-3 text-lg md:text-xl leading-relaxed mx-auto mb-10"
          style={{ color: 'rgba(232,234,246,0.5)', maxWidth: '540px' }}>
          SpacePulse AI turns complex space weather into{' '}
          <span style={{ color: 'var(--aurora)', opacity: 0.9 }}>personalized, profession-aware</span>{' '}
          insights. Built for everyone — not just astronomers.
        </p>

        <div className="fade-up-4 flex flex-wrap justify-center gap-10 mb-12">
          {[
            { value: "LIVE", label: "NOAA + NASA Data" },
            { value: "6",    label: "Professions Supported" },
            { value: "AI",   label: "Groq Llama 3 Engine" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold glow-cosmic mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--aurora)', letterSpacing: '0.05em' }}>
                {s.value}
              </p>
              <p className="label-mono">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="fade-up-5">
          <Link href="/dashboard"
            className="inline-block font-semibold px-10 py-4 rounded-2xl text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--solar) 0%, #FF8C42 100%)',
              boxShadow: '0 0 36px rgba(255,87,34,0.35)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              fontSize: '0.875rem',
            }}>
            LAUNCH DASHBOARD →
          </Link>
        </div>
      </div>

      <div className="flex-1 z-10" />

      <p className="relative z-10 label-mono py-5">
        NOAA · NASA · GROQ AI · CELESTRAK
      </p>

    </main>
  );
}
