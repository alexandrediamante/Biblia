import { useCallback, useEffect, useRef, useState } from 'react';

const ONE_SECOND = 1000;

export const useReadingTimer = (limitMs: number | null) => {
  const [remainingMs, setRemainingMs] = useState(limitMs ?? 0);
  const [isBlocked, setIsBlocked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!limitMs) {
      return;
    }

    clearTimer();
    setRemainingMs(limitMs);
    setIsBlocked(false);

    intervalRef.current = setInterval(() => {
      setRemainingMs((prev) => {
        if (prev <= ONE_SECOND) {
          clearTimer();
          setIsBlocked(true);
          return 0;
        }
        return prev - ONE_SECOND;
      });
    }, ONE_SECOND);
  }, [clearTimer, limitMs]);

  const reset = useCallback(() => {
    clearTimer();
    setIsBlocked(false);
    setRemainingMs(limitMs ?? 0);
  }, [clearTimer, limitMs]);

  useEffect(() => {
    if (limitMs === null) {
      reset();
    }
  }, [limitMs, reset]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    remainingMs,
    isBlocked,
    start,
    reset
  };
};
