"use client";

import { createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google"; // Example using Roboto font

// TODO (Fix): Figure out why fonts aren't working [🌀-1]
// TODO (Investigation): Why doesn't border box work here? [🌀-2]

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    color: #ffffff;
    user-select: none;
    box-sizing: border-box;
    transform-box: border-box;
    -ms-overflow-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    
    ::-webkit-scrollbar {
      display: none;
    }

    /* Dark gradient background that matches hamburger menu theme */
    background: linear-gradient(
      135deg,
      #0f172a 0%,
      #1e293b 25%,
      #334155 50%,
      #1e293b 75%,
      #0f172a 100%
    );
    
    /* Alternative: Subtle animated gradient */
    background-size: 400% 400%;
    animation: gradientShift 20s ease infinite;
    
    /* Ensure full height */
    min-height: 100vh;
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  /* Add some texture with a subtle pattern overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: -1;
  }
`;
