import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const showConsoleSignature = () => {
  console.clear();
  console.log(
    `%c
   ______          __     _____       __
  / ____/___  ____/ /__  / ___/____  / /_  ___  ________
 / /   / __ \\/ __  / _ \\ \\__ \\/ __ \\/ __ \\/ _ \\/ ___/ _ \\
/ /___/ /_/ / /_/ /  __/___/ / /_/ / / / /  __/ /  /  __/
\\____/\\____/\\__,_/\\___//____/ .___/_/ /_/\\___/_/   \\___/
                            /_/

             thealihamza04
`,
    "color: #2563eb; font-weight: 800; line-height: 1.2;",
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

setTimeout(showConsoleSignature, 0);
