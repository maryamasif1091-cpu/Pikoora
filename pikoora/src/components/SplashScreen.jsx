import React, { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // 3 seconds ke baad automatic home page load ho jayegi
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes netflixZoom {
            0% {
              transform: scale(0.4);
              opacity: 0;
            }
            40% {
              transform: scale(1.1);
              opacity: 1;
            }
            70% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.03);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.25;
              transform: scale(1);
            }
            50% {
              opacity: 0.45;
              transform: scale(1.15);
            }
          }

          @keyframes spinDots {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Light Red Background Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          backgroundColor: '#E50914',
          borderRadius: '50%',
          filter: 'blur(110px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 2.5s ease-in-out infinite',
        }}
      />

      {/* Center Larger Bold Red "P" with Light Glow */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'netflixZoom 1.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
        }}
      >
        <span
          style={{
            color: '#E50914',
            fontSize: '240px',
            lineHeight: '1',
            fontWeight: '800',
            fontFamily: 'Arial, Helvetica, sans-serif',
            letterSpacing: '0px',
            textShadow: '0 0 25px rgba(229, 9, 20, 0.45), 0 0 50px rgba(229, 9, 20, 0.2)',
            userSelect: 'none',
          }}
        >
          P
        </span>
      </div>

      {/* Bottom Red Circular Dotted Spinner */}
      <div
        style={{
          position: 'absolute',
          bottom: '75px',
          zIndex: 10,
        }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 50 50"
          style={{
            animation: 'spinDots 1.2s linear infinite',
          }}
        >
          <circle cx="25" cy="5" r="4" fill="#E50914" opacity="1" />
          <circle cx="39" cy="11" r="3.7" fill="#E50914" opacity="0.85" />
          <circle cx="45" cy="25" r="3.4" fill="#E50914" opacity="0.70" />
          <circle cx="39" cy="39" r="3" fill="#E50914" opacity="0.55" />
          <circle cx="25" cy="45" r="2.6" fill="#E50914" opacity="0.40" />
          <circle cx="11" cy="39" r="2.2" fill="#E50914" opacity="0.25" />
          <circle cx="5" cy="25" r="1.8" fill="#E50914" opacity="0.15" />
        </svg>
      </div>
    </div>
  );
}