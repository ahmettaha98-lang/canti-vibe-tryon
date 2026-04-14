import { useEffect } from "react";

declare global {
  interface Window {
    CANTICO_KEY?: string;
    __canticoWidgetLoading?: boolean;
  }
}

const WIDGET_SRC = "https://look-on-live.lovable.app/widget.js";
const SCRIPT_SELECTOR = 'script[src*="look-on-live.lovable.app/widget.js"]';
const IMAGE_SELECTOR = "[data-cantico-image]";
const BUTTON_SELECTOR = ".cantico-btn";
const OVERLAY_SELECTOR = ".cantico-overlay";

const cleanupCanticoArtifacts = () => {
  document.querySelectorAll(SCRIPT_SELECTOR).forEach((element) => element.remove());
  document.querySelectorAll(`${BUTTON_SELECTOR}, ${OVERLAY_SELECTOR}`).forEach((element) => element.remove());

  document.querySelectorAll("style").forEach((style) => {
    const css = style.textContent ?? "";

    if (css.includes(".cantico-btn") && css.includes(".cantico-overlay")) {
      style.remove();
    }
  });
};

const shouldRefreshWidget = () => {
  const images = document.querySelectorAll(IMAGE_SELECTOR);

  if (!images.length) {
    return false;
  }

  const buttons = document.querySelectorAll(BUTTON_SELECTOR);
  return buttons.length !== images.length;
};

export function useCanticoWidget() {
  useEffect(() => {
    let frameId: number | null = null;

    const scheduleWidgetMount = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const key = localStorage.getItem("cantico_api_key");

        if (!key) {
          cleanupCanticoArtifacts();
          window.CANTICO_KEY = undefined;
          frameId = null;
          return;
        }

        window.CANTICO_KEY = key;

        const hasImages = document.querySelector(IMAGE_SELECTOR);
        if (!hasImages) {
          cleanupCanticoArtifacts();
          frameId = null;
          return;
        }

        if (!shouldRefreshWidget() || window.__canticoWidgetLoading) {
          frameId = null;
          return;
        }

        cleanupCanticoArtifacts();
        window.__canticoWidgetLoading = true;

        const script = document.createElement("script");
        script.src = WIDGET_SRC;
        script.async = true;
        script.onload = () => {
          window.__canticoWidgetLoading = false;

          if (shouldRefreshWidget()) {
            scheduleWidgetMount();
          }
        };
        script.onerror = () => {
          window.__canticoWidgetLoading = false;
        };

        document.body.appendChild(script);
        frameId = null;
      });
    };

    const observer = new MutationObserver(() => {
      if (!document.querySelector(OVERLAY_SELECTOR)) {
        scheduleWidgetMount();
      }
    });

    scheduleWidgetMount();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      observer.disconnect();
      window.__canticoWidgetLoading = false;
    };
  }, []);
}
