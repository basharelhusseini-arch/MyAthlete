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
  
  // THRIV/// wordmark SVG - exact match to reference logo spacing
  const logoSvg = (
    <svg
      viewBox="0 0 420 100"
      className={`${sizeClasses[size]} ${className} w-auto`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: variant === 'gold' ? 'drop-shadow(0 0 12px rgba(255, 208, 0, 0.15))' : 'none' }}
    >
      {/* THRIV/// wordmark with tight spacing matching reference */}
      <g transform="skewX(-10)">
        {/* T - wider, bolder */}
        <path
          d="M 8 18 L 65 18 L 65 30 L 48 30 L 48 82 L 32 82 L 32 30 L 15 30 Z"
          fill={fillColor}
        />
        
        {/* H - tight to T */}
        <path
          d="M 72 18 L 88 18 L 88 44 L 110 44 L 110 18 L 126 18 L 126 82 L 110 82 L 110 58 L 88 58 L 88 82 L 72 82 Z"
          fill={fillColor}
        />
        
        {/* R - tight to H */}
        <path
          d="M 133 18 L 175 18 C 184 18 190 20 195 24 C 199 28 201 33 201 41 C 201 48 199 53 195 57 C 190 61 184 63 175 63 L 149 63 L 149 82 L 133 82 Z M 149 31 L 149 51 L 172 51 C 177 51 180 50 182 48 C 184 46 185 43 185 40 C 185 36 184 33 182 31 C 180 29 177 28 172 28 L 149 28 Z"
          fill={fillColor}
        />
        {/* R tail */}
        <path
          d="M 168 63 L 182 63 L 196 82 L 178 82 Z"
          fill={fillColor}
        />
        
        {/* I - very tight to R */}
        <path
          d="M 203 18 L 219 18 L 219 82 L 203 82 Z"
          fill={fillColor}
        />
        
        {/* V - tight to I */}
        <path
          d="M 226 18 L 243 18 L 263 66 L 283 18 L 300 18 L 270 82 L 256 82 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 1 - very tight to V, almost touching */}
        <path
          d="M 304 82 L 315 82 L 330 18 L 319 18 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 2 - tight spacing */}
        <path
          d="M 333 82 L 344 82 L 359 18 L 348 18 Z"
          fill={fillColor}
        />
        
        {/* Forward slash 3 - tight spacing */}
        <path
          d="M 362 82 L 373 82 L 388 18 L 377 18 Z"
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
