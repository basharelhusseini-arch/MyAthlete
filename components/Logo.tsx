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
  const fillColor = variant === 'gold' ? '#FFD000' : '#FFFFFF';
  
  // THRIV/// wordmark SVG - exact replica of brand wordmark with forward slashes
  const logoSvg = (
    <svg
      viewBox="0 0 445 100"
      className={`${sizeClasses[size]} ${className} w-auto`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: variant === 'gold' ? 'drop-shadow(0 0 12px rgba(255, 208, 0, 0.15))' : 'none' }}
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
        
        {/* I - moved right for better R-I spacing */}
        <path
          d="M 225 15 L 242 15 L 242 85 L 225 85 Z"
          fill={fillColor}
        />
        
        {/* V (single) - adjusted for better I-V flow */}
        <path
          d="M 252 15 L 270 15 L 292 68 L 314 15 L 332 15 L 300 85 L 284 85 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 1 - / shape (bottom-left to top-right) - tighter to V */}
        <path
          d="M 338 85 L 350 85 L 366 15 L 354 15 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 2 - / shape */}
        <path
          d="M 370 85 L 382 85 L 398 15 L 386 15 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 3 - / shape */}
        <path
          d="M 402 85 L 414 85 L 430 15 L 418 15 Z"
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
