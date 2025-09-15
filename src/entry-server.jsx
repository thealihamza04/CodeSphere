import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url, context = {}) {
    try {
        return renderToString(
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        );
    } catch (error) {
        console.error("Rendering error:", error);
        return "<!-- Error rendering application -->";
    }
}
