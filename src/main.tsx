import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PopupProvider } from "../src/components/PopupContext.tsx";
import Popup from "./components/PopUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PopupProvider>
      <App />
      <Popup />
    </PopupProvider>
  </StrictMode>
);
