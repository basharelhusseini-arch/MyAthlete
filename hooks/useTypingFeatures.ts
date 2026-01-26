/**
 * Privacy-Safe Typing Features Collection
 * 
 * Collects ONLY timing features (no keystroke content)
 * - Dwell time (key down to key up)
 * - Flight time (key up to next key down)
 * - Backspace ratio
 * - Paste count
 * 
 * USE ONLY on non-password inputs (email, search, etc.)
 */

import { useRef, useCallback } from 'react';

export interface TypingFeatures {
  mean_dwell: number;
  std_dwell: number;
  mean_flight: number;
  std_flight: number;
  backspace_ratio: number;
  paste_count: number;
  sample_size: number;
}

interface KeyEvent {
  key: string;
  timestamp: number;
  type: 'down' | 'up';
}

export function useTypingFeatures() {
  const events = useRef<KeyEvent[]>([]);
  const pasteCount = useRef(0);
  const backspaceCount = useRef(0);
  const totalKeyCount = useRef(0);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Skip if modifier keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    totalKeyCount.current++;
    
    if (e.key === 'Backspace') {
      backspaceCount.current++;
    }
    
    events.current.push({
      key: e.key, // We don't send this to server, just use for pairing
      timestamp: Date.now(),
      type: 'down',
    });
    
    // Keep only last 100 events to prevent memory issues
    if (events.current.length > 200) {
      events.current = events.current.slice(-100);
    }
  }, []);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    // Skip if modifier keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    events.current.push({
      key: e.key,
      timestamp: Date.now(),
      type: 'up',
    });
    
    // Keep only last 100 events
    if (events.current.length > 200) {
      events.current = events.current.slice(-100);
    }
  }, []);

  const handlePaste = useCallback(() => {
    pasteCount.current++;
  }, []);

  const getFeatures = useCallback((): TypingFeatures | null => {
    const dwellTimes: number[] = [];
    const flightTimes: number[] = [];
    
    // Calculate dwell times (down to up for same key)
    for (let i = 0; i < events.current.length - 1; i++) {
      const current = events.current[i];
      const next = events.current[i + 1];
      
      if (current.type === 'down' && next.type === 'up' && current.key === next.key) {
        dwellTimes.push(next.timestamp - current.timestamp);
      }
    }
    
    // Calculate flight times (up to next down)
    for (let i = 0; i < events.current.length - 1; i++) {
      const current = events.current[i];
      const next = events.current[i + 1];
      
      if (current.type === 'up' && next.type === 'down') {
        flightTimes.push(next.timestamp - current.timestamp);
      }
    }
    
    // Need at least 5 samples to compute features
    if (dwellTimes.length < 5 && flightTimes.length < 5) {
      return null;
    }
    
    // Compute statistics
    const mean = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const std = (arr: number[]) => {
      if (arr.length === 0) return 0;
      const m = mean(arr);
      const variance = arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / arr.length;
      return Math.sqrt(variance);
    };
    
    return {
      mean_dwell: mean(dwellTimes),
      std_dwell: std(dwellTimes),
      mean_flight: mean(flightTimes),
      std_flight: std(flightTimes),
      backspace_ratio: totalKeyCount.current > 0 ? backspaceCount.current / totalKeyCount.current : 0,
      paste_count: pasteCount.current,
      sample_size: Math.min(dwellTimes.length, flightTimes.length),
    };
  }, []);

  const reset = useCallback(() => {
    events.current = [];
    pasteCount.current = 0;
    backspaceCount.current = 0;
    totalKeyCount.current = 0;
  }, []);

  return {
    handleKeyDown,
    handleKeyUp,
    handlePaste,
    getFeatures,
    reset,
  };
}
