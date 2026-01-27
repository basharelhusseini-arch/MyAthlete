'use client';

import Link from 'next/link';

interface LogoProps {
  variant?: 'gold' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  linkTo?: string;
}

// Size presets matching requirements
const sizeClasses = {
  sm: 'h-5',      // 20px - mobile navbar
  md: 'h-6',      // 24px - desktop navbar, sidebar
  lg: 'h-8',      // 32px - larger contexts
  xl: 'h-12',     // 48px - section headers
  hero: 'h-16 sm:h-20 lg:h-24', // 64-96px responsive - hero sections
};

export default function Logo({
  variant = 'gold',
  size = 'md',
  className = '',
  linkTo,
}: LogoProps) {
  const fillColor = variant === 'gold' ? '#FFC300' : '#FFFFFF';
  
  // THRIV/// wordmark SVG - exact replica of brand wordmark with forward slashes
  const logoSvg = (
    <svg
      viewBox="0 0 490 100"
      className={`${sizeClasses[size]} ${className} w-auto`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: variant === 'gold' ? 'drop-shadow(0 0 12px rgba(255, 195, 0, 0.15))' : 'none' }}
    >
      {/* THRIV/// wordmark with italic slant and forward slashes */}
      <g transform="skewX(-8)">
        {/* T */}
        <path
          d="M 10 15 L 70 15 L 70 28 L 52 28 L 52 85 L 35 85 L 35 28 L 17 28 Z"
          fill={fillColor}
        />
        
        {/* H */}
        <path
          d="M 78 15 L 95 15 L 95 43 L 118 43 L 118 15 L 135 15 L 135 85 L 118 85 L 118 58 L 95 58 L 95 85 L 78 85 Z"
          fill={fillColor}
        />
        
        {/* R */}
        <path
          d="M 145 15 L 190 15 C 200 15 207 17 212 21 C 217 25 220 31 220 40 C 220 48 217 54 212 58 C 207 62 200 64 190 64 L 162 64 L 162 85 L 145 85 Z M 162 29 L 162 51 L 187 51 C 192 51 195 50 197 48 C 199 46 200 43 200 39 C 200 35 199 32 197 30 C 195 28 192 27 187 27 L 162 27 Z"
          fill={fillColor}
        />
        {/* R tail */}
        <path
          d="M 180 64 L 195 64 L 210 85 L 190 85 Z"
          fill={fillColor}
        />
        
        {/* I */}
        <path
          d="M 220 15 L 237 15 L 237 85 L 220 85 Z"
          fill={fillColor}
        />
        
        {/* V (single) */}
        <path
          d="M 247 15 L 265 15 L 287 68 L 309 15 L 327 15 L 295 85 L 279 85 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 1 */}
        <path
          d="M 345 15 L 360 15 L 380 85 L 365 85 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 2 */}
        <path
          d="M 390 15 L 405 15 L 425 85 L 410 85 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 3 */}
        <path
          d="M 435 15 L 450 15 L 470 85 L 455 85 Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="inline-block transition-opacity hover:opacity-80">
        {logoSvg}
      </Link>
    );
  }

  return <div className="inline-block">{logoSvg}</div>;
}
