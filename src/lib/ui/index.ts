"use client";

import { createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google"; // Example using Roboto font

// TODO (Fix): Figure out why fonts aren't working [🌀-1]
// TODO (Investigation): Why doesn't border box work here? [🌀-2]

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    /* font-family: Arial, Helvetica, sans-serif; */
    /* -webkit-font-smoothing: antialiased; */
    /* -moz-osx-font-smoothing: grayscale; */
    color: white;
    /* font-family: Arial, Helvetica, sans-serif; */
    user-select: none;
    /* overflow: scroll; */
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }

    /* https://www.joshwcomeau.com/gradient-generator/ */
    background-image: linear-gradient(
      319deg,
      hsl(0deg 100% 49%) 0%,
      hsl(22deg 99% 49%) 6%,
      hsl(28deg 93% 55%) 11%,
      hsl(33deg 90% 62%) 17%,
      hsl(39deg 87% 70%) 22%,
      hsl(45deg 87% 79%) 28%,
      hsl(53deg 100% 90%) 33%,
      hsl(47deg 90% 82%) 39%,
      hsl(43deg 89% 75%) 44%,
      hsl(39deg 92% 69%) 50%,
      hsl(35deg 94% 63%) 56%,
      hsl(32deg 97% 57%) 61%,
      hsl(30deg 100% 50%) 67%,
      hsl(18deg 85% 54%) 72%,
      hsl(6deg 66% 53%) 78%,
      hsl(354deg 57% 46%) 83%,
      hsl(344deg 62% 37%) 89%,
      hsl(336deg 63% 28%) 94%,
      hsl(327deg 61% 20%) 100%
    );
  }
`;
