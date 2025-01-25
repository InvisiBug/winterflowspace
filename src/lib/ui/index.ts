"use client";

import { createGlobalStyle } from "styled-components";
import { background } from "../colours";

// TODO (Fix): Figure out why fonts arent working [🌀-1]
// TODO (Investigation): Why doesnt border box work here? [🌀-2]

export const GlobalSytles = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
    /* font-family: Arial, Helvetica, sans-serif; */
    user-select: none;
    /* overflow: scroll; */
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
    background-color: ${background};
  }
`;
