'use client';

interface BackgroundWordmarkProps {
  className?: string;
}

export default function BackgroundWordmark({ className = '' }: BackgroundWordmarkProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        zIndex: 10,
        overflow: 'visible',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    >
      <svg
        className="wordmark-svg"
        width="100%"
        height="100%"
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="wordmark-text"
          style={{
            fontSize: '90px',
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
          opacity: 0.5; /* Desktop default */
        }

        /* Mobile: Increase opacity for better visibility */
        @media (max-width: 768px) {
          .wordmark-svg {
            opacity: 0.65;
          }
        }

        /* Responsive font sizing */
        @media (max-width: 1200px) {
          .wordmark-text {
            font-size: 75px;
            letter-spacing: 0.25em;
          }
        }

        @media (max-width: 1024px) {
          .wordmark-text {
            font-size: 65px;
            letter-spacing: 0.22em;
          }
        }

        @media (max-width: 768px) {
          .wordmark-text {
            font-size: 50px;
            letter-spacing: 0.18em;
          }
        }

        @media (max-width: 640px) {
          .wordmark-text {
            font-size: 38px;
            letter-spacing: 0.15em;
          }
        }

        @media (max-width: 480px) {
          .wordmark-text {
            font-size: 28px;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </div>
  );
}
