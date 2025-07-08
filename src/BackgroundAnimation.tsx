import React from 'react';
import Lottie from 'lottie-react';
import animationData from './cards.json';

export default function BackgroundAnimation() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '400px',
        opacity: 0.40,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
