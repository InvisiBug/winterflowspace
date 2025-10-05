"use client";

import { createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google"; // Example using Roboto font

// TODO (Fix): Figure out why fonts aren't working [🌀-1]
// TODO (Investigation): Why doesn't border box work here? [🌀-2]

export const GlobalStyles = createGlobalStyle`
  /* Additional styled-components specific styles can go here */
  /* Background is now handled by globals.css for immediate SSR */
`;
