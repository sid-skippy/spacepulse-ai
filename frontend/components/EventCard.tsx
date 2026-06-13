interface EventCardProps {
  eventType: string;
  severity: number;
  kpIndex: number;
  solarFlare: string;
}

export default function EventCard({ eventType, severity, kpIndex, solarFlare }: EventCardProps) {
  const isHigh = severity >= 7;
  const isMod  = severity >= 4 && severity < 7;
  const badgeClass = isHigh ? "badge-high" : isMod ? "badge-mod" : "badge-low";
  const label      = isHigh ? "HIGH ALERT"  : isMod ? "MODERATE"  : "NOMINAL";
  const accentColor = isHigh ? 'var(--solar)' : 'var(--cosmic)';

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

      <div className="flex items-start justify-between mb-6">
        <div>
          {/* Label — mono for instrument-panel feel */}
          <p className="label-mono mb-2">Active Event</p>
          {/* Event type — Space Grotesk bold, NOT Orbitron */}
          <h2 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: '-0.01em' }}>
            {eventType}
          </h2>
        </div>
        <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${badgeClass}`}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em', fontSize: '0.6rem' }}>
          {label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "KP INDEX",    value: String(kpIndex), color: 'var(--solar)'  },
          { label: "SOLAR FLARE", value: solarFlare,       color: 'var(--aurora)' },
          { label: "SEVERITY",    value: `${severity}/10`, color: 'white'         },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-4 text-center"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="label-mono mb-2">{stat.label}</p>
            {/* Data values in Space Mono — makes them feel like instrument readouts */}
            <p className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
