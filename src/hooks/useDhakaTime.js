'use client'
import React, { useState, useEffect } from 'react';

export function useDhakaTime() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, fullTime: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const options = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const dhakaStr = now.toLocaleTimeString('en-GB', options);
      const [h, m, s] = dhakaStr.split(':').map(Number);
      setTime({ hours: h, minutes: m, seconds: s, fullTime: dhakaStr });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
