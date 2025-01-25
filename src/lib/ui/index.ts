"use client";

import { createGlobalStyle } from "styled-components";
import { background } from "../colours";

import { Roboto } from "next/font/google"; // Example using Roboto font

// TODO (Fix): Figure out why fonts arent working [🌀-1]
// TODO (Investigation): Why doesnt border box work here? [🌀-2]

export const GlobalSytles = createGlobalStyle`
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
    /* background-color: ${background}; */
    /* background-color: #243E36 */

    background-image: linear-gradient(
    45deg,
    hsl(162deg 27% 19%) 0%,
    hsl(140deg 21% 20%) 14%,
    hsl(103deg 19% 21%) 29%,
    hsl(73deg 24% 19%) 43%,
    hsl(50deg 31% 20%) 57%,
    hsl(36deg 38% 21%) 71%,
    hsl(25deg 39% 23%) 86%,
    hsl(14deg 36% 26%) 100%
  );
  }
`;
