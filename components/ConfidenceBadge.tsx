'use client';

/**
 * CONFIDENCE BADGE COMPONENT
 * 
 * Displays user's confidence level with supportive messaging
 * 
 * IMPORTANT:
 * - Never implies punishment or exclusion
 * - Purely informational and positive
 * - Shows path to improvement, not judgment
 */

import { ConfidenceLevel } from '@/types';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  score?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const CONFIDENCE_CONFIG = {
  low: {
    icon: Shield,
    label: 'Standard',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20',
    description: 'Manual logging - all data is valuable',
  },
  medium: {
    icon: ShieldCheck,
    label: 'Verified',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    description: 'Partially verified data',
  },
  high: {
    icon: ShieldCheck,
    label: 'Highly Verified',
    color: 'text-thrivv-gold-500',
    bgColor: 'bg-thrivv-gold-500/10',
    borderColor: 'border-thrivv-gold-500/20',
    description: 'Wearable-verified data',
  },
};

export default function ConfidenceBadge({
  level,
  score,
  showScore = false,
  size = 'md',
  showLabel = true,
}: ConfidenceBadgeProps) {
  const config = CONFIDENCE_CONFIG[level];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg border ${config.bgColor} ${config.borderColor} ${sizeClasses[size]}`}
      title={config.description}
    >
      <Icon className={`${iconSizes[size]} ${config.color}`} />
      {showLabel && (
        <span className={`font-medium ${config.color}`}>
          {config.label}
        </span>
      )}
      {showScore && score !== undefined && (
        <span className={`font-semibold ${config.color}`}>
          {score}
        </span>
      )}
    </div>
  );
}

/**
 * Confidence Tooltip - explains what confidence means
 */
export function ConfidenceTooltip() {
  return (
    <div className="max-w-sm p-4 bg-thrivv-bg-card border border-thrivv-gold-500/20 rounded-lg shadow-xl">
      <h4 className="font-semibold text-thrivv-text-primary mb-2">
        About Confidence Scores
      </h4>
      <p className="text-sm text-thrivv-text-secondary mb-3">
        Confidence shows how complete and verified your data is. It's purely informational and never reduces your Health Score.
      </p>
      
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-thrivv-gold-500 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-thrivv-text-primary">
              High (75-100)
            </div>
            <div className="text-xs text-thrivv-text-muted">
              Wearable-verified + consistent logging
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-thrivv-text-primary">
              Medium (50-74)
            </div>
            <div className="text-xs text-thrivv-text-muted">
              Partially verified or consistent manual logging
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-thrivv-text-primary">
              Standard (0-49)
            </div>
            <div className="text-xs text-thrivv-text-muted">
              Manual logging - all data is valuable!
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-thrivv-gold-500/10">
        <p className="text-xs text-thrivv-text-muted">
          💡 <span className="font-semibold">Remember:</span> Your Health Score is never affected by confidence level. This is just to show data completeness.
        </p>
      </div>
    </div>
  );
}
