'use client';

interface BackgroundWordmarkProps {
  className?: string;
}

export default function BackgroundWordmark({ className = '' }: BackgroundWordmarkProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      <svg
        className="wordmark-svg"
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="wordmark-text"
          style={{
            fontSize: '80px',
            fontWeight: 900,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: 'rgba(255, 200, 0, 0.85)',
            strokeWidth: '2.5',
            paintOrder: 'stroke',
          }}
        >
          BUILT TO THRIVV
        </text>
      </svg>

      <style jsx>{`
        .wordmark-svg {
          opacity: 0.55; /* Desktop default */
        }

        /* Mobile: Increase opacity for better visibility */
        @media (max-width: 768px) {
          .wordmark-svg {
            opacity: 0.7;
          }
        }

        /* Responsive font sizing */
        @media (max-width: 1024px) {
          .wordmark-text {
            font-size: 60px;
          }
        }

        @media (max-width: 768px) {
          .wordmark-text {
            font-size: 45px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-width: 480px) {
          .wordmark-text {
            font-size: 32px;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </div>
  );
}
