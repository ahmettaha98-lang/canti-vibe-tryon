import { useEffect } from "react";

declare global {
  interface Window {
    CANTICO_KEY?: string;
  }
}

export function useCanticoWidget() {
  useEffect(() => {
    const key = localStorage.getItem("cantico_api_key");
    if (!key) return;

    // Set global key for the widget
    window.CANTICO_KEY = key;

    // Check if script already loaded
    if (document.querySelector('script[src*="look-on-live.lovable.app/widget.js"]')) return;

    const s = document.createElement("script");
    s.src = "https://look-on-live.lovable.app/widget.js";
    s.async = true;
    document.body.appendChild(s);

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);
}
