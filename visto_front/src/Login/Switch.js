import React, { useState } from 'react';
import './switch.css'; // Assuming you have saved the CSS in a file named Switch.css

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input 
        className="switch__input" 
        type="checkbox" 
        role="switch" 
        checked={isChecked}
        onChange={handleToggle} 
      />
      <span className="switch__base-outer"></span>
      <span className="switch__base-inner"></span>
      <svg className="switch__base-neon" viewBox="0 0 40 24" width="40px" height="24px">
        <defs>
          <filter id="switch-glow">
            <feGaussianBlur result="coloredBlur" stdDeviation="1"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="coloredBlur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <linearGradient id="switch-gradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--on-hue1),90%,70%)" />
            <stop offset="100%" stopColor="hsl(var(--on-hue2),90%,70%)" />
          </linearGradient>
          <linearGradient id="switch-gradient2" x1="0.7" y1="0" x2="0.3" y2="1">
            <stop offset="25%" stopColor="hsla(var(--on-hue1),90%,70%,0)" />
            <stop offset="50%" stopColor="hsla(var(--on-hue1),90%,70%,0.3)" />
            <stop offset="100%" stopColor="hsla(var(--on-hue2),90%,70%,0.3)" />
          </linearGradient>
        </defs>
        <path 
          fill="none" 
          filter="url(#switch-glow)" 
          stroke="url(#switch-gradient1)" 
          strokeWidth="1" 
          strokeDasharray={isChecked ? "52.13 0 52.13" : "0 104.26 0"} 
          strokeDashoffset="0.01" 
          strokeLinecap="round" 
          d="m.5,12C.5,5.649,5.649.5,12,.5h16c6.351,0,11.5,5.149,11.5,11.5s-5.149,11.5-11.5,11.5H12C5.649,23.5.5,18.351.5,12Z"
        />
      </svg>
      <span className="switch__knob-shadow"></span>
      <span className="switch__knob-container">
        <span className="switch__knob">
          <svg className="switch__knob-neon" viewBox="0 0 48 48" width="48px" height="48px">
            <circle 
              fill="none" 
              stroke="url(#switch-gradient2)" 
              strokeDasharray={isChecked ? "45.16 0 45.16 54.19" : "0 90.32 0 54.19"} 
              strokeLinecap="round" 
              strokeWidth="1" 
              r="23" 
              cx="24" 
              cy="24" 
              transform="rotate(-112.5,24,24)" 
              opacity={isChecked ? "1" : "0"} 
              transition="opacity var(--trans-dur) steps(1,end), stroke-dasharray var(--trans-dur) var(--trans-timing)"
            />
          </svg>  
        </span>
      </span>
      <span className="switch__led"></span>
      <span className="switch__text">Power</span>
    </label>
  );
}

export default Switch;
