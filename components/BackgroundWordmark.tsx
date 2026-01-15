'use client';

interface BackgroundWordmarkProps {
  text?: string;
  intensity?: number; // 0-1 scale for easy tuning (default 0.45)
  position?: 'center' | 'upper' | 'lower';
  className?: string;
}

export default function BackgroundWordmark({ 
  text = 'BUILT TO THRIVV',
  intensity = 0.45,
  position = 'center',
  className = ''
}: BackgroundWordmarkProps) {
  
  // Calculate dynamic values based on intensity
  const strokeOpacity = intensity * 0.35;
  const fillOpacity = intensity * 0.05;
  const glowOpacity = intensity * 0.12;
  const overallOpacity = Math.min(intensity + 0.1, 0.65);

  // Position mapping
  const positionClasses = {
    center: 'top-1/2 -translate-y-1/2',
    upper: 'top-1/3 -translate-y-1/2',
    lower: 'top-2/3 -translate-y-1/2',
  };

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      <div 
        className={`absolute left-1/2 -translate-x-1/2 ${positionClasses[position]}`}
        style={{ opacity: overallOpacity }}
      >
        <h2 
          className="wordmark-text select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(72px, 10vw, 160px)',
            fontWeight: 900,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: `rgba(251, 191, 36, ${fillOpacity})`,
            WebkitTextStroke: `1px rgba(251, 191, 36, ${strokeOpacity})`,
            textShadow: `
              0 0 24px rgba(251, 191, 36, ${glowOpacity}),
              0 0 48px rgba(251, 191, 36, ${glowOpacity * 0.5}),
              0 0 80px rgba(251, 191, 36, ${glowOpacity * 0.25})
            `,
          }}
        >
          {text}
        </h2>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .wordmark-text {
          position: relative;
          background: linear-gradient(
            90deg,
            rgba(251, 191, 36, ${fillOpacity}) 0%,
            rgba(251, 191, 36, ${fillOpacity * 2}) 45%,
            rgba(249, 115, 22, ${fillOpacity * 2.5}) 50%,
            rgba(251, 191, 36, ${fillOpacity * 2}) 55%,
            rgba(251, 191, 36, ${fillOpacity}) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 10s linear infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .wordmark-text {
            font-size: clamp(48px, 12vw, 96px) !important;
            letter-spacing: 0.15em !important;
            white-space: normal !important;
            text-align: center;
            line-height: 0.9;
            max-width: 90vw;
            word-break: break-word;
          }
        }

        @media (max-width: 480px) {
          .wordmark-text {
            font-size: clamp(40px, 10vw, 72px) !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>
    </div>
  );
}
