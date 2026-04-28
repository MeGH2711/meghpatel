import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-cursor-style';
    styleTag.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleTag);

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
      setIsHovering(!!el);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('pointerover', handlePointerOver);

    return () => {
      const tag = document.getElementById('custom-cursor-style');
      if (tag) tag.remove();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('pointerover', handlePointerOver);
    };
  }, []);

  const scale = isClicking ? 0.82 : isHovering ? 1 : 1;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          transition: 'transform 0.15s ease, filter 0.2s ease',
          filter: isHovering
            ? 'drop-shadow(0 0 5px rgba(106,176,243,0.85)) drop-shadow(0 0 10px rgba(106,176,243,0.4))'
            : 'drop-shadow(0 1px 3px rgba(0,0,0,0.9)) drop-shadow(0 0 5px rgba(255,255,255,0.12))',
        }}
      >
        {/* Simplified triangle cursor without the tail */}
        <path
          d="M1.5 1.5 L1.5 20.5 L6.5 13.5 L16.5 13.5 Z"
          fill={isHovering ? '#6ab0f3' : '#ffffff'}
          stroke={isHovering ? '#1a56b0' : '#111827'}
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ transition: 'fill 0.2s ease, stroke 0.2s ease' }}
        />
      </svg>
    </div>
  );
};

export default CustomCursor;