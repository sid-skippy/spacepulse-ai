"use client";
import { useEffect, useRef, useState } from "react";

interface ImpactCardProps {
  impactScore: number;
  summary: string;
  recommendation: string;
}

export default function ImpactCard({ impactScore, summary, recommendation }: ImpactCardProps) {
  const isHigh = impactScore >= 7;
  const scoreColor = isHigh
    ? 'var(--solar)'
    : impactScore >= 4 ? '#FBB724' : '#4ADE80';

  // Animate score number counting up
  const [displayScore, setDisplayScore] = useState(0);
  // Animate bars filling in
  const [filledBars, setFilledBars] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;

          // Count up the score
          let start = 0;
          const step = () => {
            start += 1;
            setDisplayScore(start);
            if (start < impactScore) requestAnimationFrame(step);
          };
          // small delay so card entrance animation finishes first
          setTimeout(() => requestAnimationFrame(step), 300);

          // Bars fill in one by one
          for (let i = 1; i <= impactScore; i++) {
            setTimeout(() => setFilledBars(i), 300 + i * 55);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [impactScore]);

  return (
    <div ref={ref} className="glass-card impact-reveal p-6 relative overflow-hidden"
      style={{ borderColor: `${scoreColor}2A` }}>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${scoreColor}, transparent)` }} />

      {/* Section label */}
      <p className="label-mono mb-6">AI Impact Analysis</p>

      {/* Score + bars */}
      <div className="flex items-center gap-6 mb-8">
        <div className={`font-bold leading-none tabular-nums ${isHigh ? 'glow-solar' : ''}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 8vw, 5rem)',
            color: scoreColor,
            minWidth: '2.5ch',
          }}>
          {displayScore}
        </div>

        <div className="flex-1">
          <p className="label-mono mb-3">Impact Score</p>
          <div className="flex gap-1.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-2 flex-1 rounded-sm"
                style={{
                  background: i < filledBars ? scoreColor : 'rgba(255,255,255,0.07)',
                  boxShadow: i < filledBars ? `0 0 5px ${scoreColor}70` : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="impact-reveal-delay mb-4 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="label-mono mb-2">Summary</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,234,246,0.75)' }}>
          {summary}
        </p>
      </div>

      {/* Recommendation */}
      <div className="impact-reveal-delay rounded-xl p-4"
        style={{
          background: `${scoreColor}0D`,
          border: `1px solid ${scoreColor}28`,
        }}>
        <p className="label-mono mb-2" style={{ color: scoreColor }}>↗ Recommendation</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,234,246,0.82)' }}>
          {recommendation}
        </p>
      </div>
    </div>
  );
}
