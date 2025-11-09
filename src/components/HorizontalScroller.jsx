import React, { useEffect, useRef } from 'react';

// A wrapper that converts vertical wheel/touch scroll into horizontal scroll
export default function HorizontalScroller({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Allow pinch-zoom and trackpad horizontal gestures
      if (e.ctrlKey) return;
      // Convert vertical wheel to horizontal scroll
      e.preventDefault();
      el.scrollBy({ left: e.deltaY + e.deltaX, behavior: 'smooth' });
    };

    // Touch handling for vertical swipes converting to horizontal
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      const dx = touchStartX - t.clientX;
      const dy = touchStartY - t.clientY;
      // If the vertical intent is stronger, translate it to horizontal
      if (Math.abs(dy) > Math.abs(dx)) {
        e.preventDefault();
        el.scrollBy({ left: dy, behavior: 'smooth' });
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth"
    >
      {children}
    </div>
  );
}
