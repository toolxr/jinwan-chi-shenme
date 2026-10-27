import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CookingApp from "@/CookingApp";
import { installLocalApi } from "@/localApi";
import "@/styles.css";

installLocalApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookingApp />
  </StrictMode>,
);
