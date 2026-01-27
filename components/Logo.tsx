'use client';

import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  className?: string;
  linkTo?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  variant = 'full',
  className = '',
  linkTo,
  width,
  height,
}: LogoProps) {
  const logoContent = (
    <>
      {variant === 'full' && (
        <svg
          viewBox="0 0 400 100"
          className={className || 'h-8 w-auto'}
          style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* THRIVV wordmark in italic style */}
          <g transform="skewX(-12)">
            {/* T */}
            <path
              d="M 15 20 L 55 20 L 55 35 L 42 35 L 42 80 L 28 80 L 28 35 L 15 35 Z"
              fill="white"
            />
            
            {/* H */}
            <path
              d="M 65 20 L 79 20 L 79 45 L 96 45 L 96 20 L 110 20 L 110 80 L 96 80 L 96 58 L 79 58 L 79 80 L 65 80 Z"
              fill="white"
            />
            
            {/* R */}
            <path
              d="M 120 20 L 155 20 C 162 20 167 22 170 26 C 173 30 175 35 175 42 C 175 48 173 52 169 55 C 166 58 161 59 155 59 L 134 59 L 134 80 L 120 80 Z M 134 33 L 134 47 L 152 47 C 155 47 157 46 158 44 C 159 42 160 40 160 37 C 160 34 159 32 158 30 C 157 28 155 27 152 27 L 134 27 Z"
              fill="white"
            />
            <path
              d="M 165 59 L 175 59 L 185 80 L 170 80 Z"
              fill="white"
            />
            
            {/* I */}
            <path
              d="M 195 20 L 209 20 L 209 80 L 195 80 Z"
              fill="white"
            />
            
            {/* V */}
            <path
              d="M 219 20 L 234 20 L 252 65 L 270 20 L 285 20 L 260 80 L 244 80 Z"
              fill="white"
            />
            
            {/* V (second) */}
            <path
              d="M 289 20 L 304 20 L 322 65 L 340 20 L 355 20 L 330 80 L 314 80 Z"
              fill="white"
            />
          </g>
          
          {/* Optional glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
      
      {variant === 'compact' && (
        <svg
          viewBox="0 0 200 100"
          className={className || 'h-8 w-auto'}
          style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Compact THRV wordmark (no double V) */}
          <g transform="skewX(-12)">
            <path
              d="M 15 20 L 55 20 L 55 35 L 42 35 L 42 80 L 28 80 L 28 35 L 15 35 Z"
              fill="white"
            />
            <path
              d="M 65 20 L 79 20 L 79 45 L 96 45 L 96 20 L 110 20 L 110 80 L 96 80 L 96 58 L 79 58 L 79 80 L 65 80 Z"
              fill="white"
            />
            <path
              d="M 120 20 L 155 20 C 162 20 167 22 170 26 C 173 30 175 35 175 42 C 175 48 173 52 169 55 C 166 58 161 59 155 59 L 134 59 L 134 80 L 120 80 Z M 134 33 L 134 47 L 152 47 C 155 47 157 46 158 44 C 159 42 160 40 160 37 C 160 34 159 32 158 30 C 157 28 155 27 152 27 L 134 27 Z"
              fill="white"
            />
            <path
              d="M 165 59 L 175 59 L 185 80 L 170 80 Z"
              fill="white"
            />
            <path
              d="M 195 20 L 234 20 L 252 65 L 270 20 L 309 20 L 260 80 L 244 80 Z"
              fill="white"
            />
          </g>
        </svg>
      )}
      
      {variant === 'icon' && (
        <div
          className={className || 'w-10 h-10 rounded-xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 flex items-center justify-center glow-gold'}
          style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* T icon */}
            <g transform="skewX(-12)">
              <path
                d="M 20 25 L 80 25 L 80 42 L 62 42 L 62 85 L 38 85 L 38 42 L 20 42 Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="inline-block transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    );
  }

  return <div className="inline-block">{logoContent}</div>;
}
