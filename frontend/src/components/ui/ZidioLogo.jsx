"use client"

import React from "react";
import ViteLogo from "@/assets/logo.png"; 

const ZidioLogo = ({ size = 48 }) => {
  return (
    <div className="zidio-logo" style={{ width: size, height: size }}>
      <img src={ViteLogo} alt="Zidio Logo" width={size} height={size} />

      <style jsx>{`
        .zidio-logo {
          display: inline-block;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .zidio-logo:hover {
          transform: scale(1.05) rotateY(10deg);
        }
      `}</style>
    </div>
  )
}

export default ZidioLogo
