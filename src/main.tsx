import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./globals.css";
import App from "./App.tsx";
import Layout from "@/lib/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>,
);
