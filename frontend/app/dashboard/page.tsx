"use client";
import { useState } from "react";
import Link from "next/link";
import ProfessionSelector from "@/components/ProfessionSelector";
import EventCard from "@/components/EventCard";
import ImpactCard from "@/components/ImpactCard";
import HeatmapChart from "@/components/HeatmapChart";

export default function Dashboard() {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [impact, setImpact] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockEvent = {
    eventType: "Geomagnetic Storm",
    severity: 7,
    kpIndex: 7,
    solarFlare: "X1.4",
  };

  const handleProfessionSelect = async (profession: string) => {
    setSelectedProfession(profession);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/impact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession, event: mockEvent.eventType, severity: mockEvent.severity }),
      });
      const data = await res.json();
      setImpact(data);
    } catch {
      setImpact({
        impactScore: 8,
        summary: "High disruption expected across communication and navigation systems.",
        recommendation: "Monitor backup channels and delay sensitive operations where possible.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen px-6 py-10 overflow-hidden">

      <div className="aurora-bg"><div className="aurora-solar" /></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="fade-up-1 flex items-center justify-between mb-10">
          <div>
            <Link href="/" className="text-xs tracking-widest mb-2 block hover:opacity-70 transition"
              style={{ color: 'var(--aurora)', fontFamily: 'Orbitron' }}>
              ← SPACEPULSE AI
            </Link>
            <h1 className="text-3xl font-black" style={{ fontFamily: 'Orbitron' }}>
              MISSION <span style={{ color: 'var(--solar)' }}>CONTROL</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Live space weather · Personalized for you
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs tracking-widest mb-1" style={{ color: 'var(--aurora)', fontFamily: 'Orbitron' }}>STATUS</div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ADE80' }} />
              <span className="text-sm font-medium text-green-400">LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* Event Card */}
        <div className="fade-up-2 mb-8">
          <EventCard {...mockEvent} />
        </div>

        {/* Profession Selector */}
        <div className="fade-up-3 mb-8">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 font-medium"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Orbitron' }}>
            — Select Your Profession
          </p>
          <ProfessionSelector selected={selectedProfession} onSelect={handleProfessionSelect} />
        </div>

        {/* Impact Card */}
        {loading && (
          <div className="fade-up-3 glass-card p-8 mb-8 text-center">
            <div className="text-sm tracking-widest animate-pulse" style={{ color: 'var(--aurora)', fontFamily: 'Orbitron' }}>
              ANALYZING IMPACT...
            </div>
          </div>
        )}
        {impact && !loading && (
          <div className="fade-up-3 mb-8">
            <ImpactCard {...impact} />
          </div>
        )}

        {/* Heatmap */}
        <div className="fade-up-4">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 font-medium"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Orbitron' }}>
            — Impact Across All Professions
          </p>
          <HeatmapChart event={mockEvent.eventType} severity={mockEvent.severity} />
        </div>

      </div>
    </main>
  );
}