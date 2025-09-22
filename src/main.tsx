import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PopupProvider } from "../src/components/PopupContext.tsx";
import Popup from "./components/PopUp.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <PopupProvider>
        <App />
        <Popup />
      </PopupProvider>
    </HelmetProvider>
  </StrictMode>
);
