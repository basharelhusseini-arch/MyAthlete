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
  
  // Fixed opacity values for readability (using gold color: rgb(255, 196, 0))
  const fillOpacity = 0.10;      // Light fill - visible but subtle
  const strokeOpacity = 0.55;    // Strong stroke - clearly readable
  const glowOpacity = 0.18;      // Subtle glow for depth
  
  // Overall opacity differs by screen size
  const desktopOpacity = 0.40;
  const mobileOpacity = 0.55;

  // Position mapping
  const positionClasses = {
    center: 'top-1/2 -translate-y-1/2',
    upper: 'top-1/3 -translate-y-1/2',
    lower: 'top-2/3 -translate-y-1/2',
  };

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      style={{ 
        zIndex: 10,  // Above background (0) but below content (20+)
        isolation: 'isolate'  // Create stacking context
      }}
      aria-hidden="true"
    >
      <div 
        className={`absolute left-1/2 -translate-x-1/2 ${positionClasses[position]} wordmark-container`}
      >
        <h2 
          className="wordmark-text select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(72px, 10vw, 160px)',
            fontWeight: 900,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: `rgba(255, 196, 0, ${fillOpacity})`,
            WebkitTextStroke: `2px rgba(255, 196, 0, ${strokeOpacity})`,
            textShadow: `
              0 0 28px rgba(255, 196, 0, ${glowOpacity}),
              0 0 56px rgba(255, 196, 0, ${glowOpacity * 0.5}),
              0 0 84px rgba(255, 196, 0, ${glowOpacity * 0.3})
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

        .wordmark-container {
          opacity: ${desktopOpacity};
        }

        .wordmark-text {
          position: relative;
          background: linear-gradient(
            90deg,
            rgba(255, 196, 0, ${fillOpacity}) 0%,
            rgba(255, 196, 0, ${fillOpacity * 1.5}) 45%,
            rgba(249, 115, 22, ${fillOpacity * 2}) 50%,
            rgba(255, 196, 0, ${fillOpacity * 1.5}) 55%,
            rgba(255, 196, 0, ${fillOpacity}) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 10s linear infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .wordmark-container {
            opacity: ${mobileOpacity};
          }
          
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
