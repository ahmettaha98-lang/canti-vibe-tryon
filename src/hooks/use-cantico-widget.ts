import { useEffect, useRef } from "react";

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

const getImageSignature = (images: NodeListOf<Element>) => {
  const sources = Array.from(images).map((image) => {
    if (!(image instanceof HTMLImageElement)) {
      return "";
    }

    return image.currentSrc || image.getAttribute("src") || "";
  });

  return [window.location.pathname, window.location.search, ...sources].join("|");
};

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

const shouldRefreshWidget = (signature: string, lastMountedSignature: string | null, lastKey: string | null, key: string) => {
  const images = document.querySelectorAll(IMAGE_SELECTOR);

  if (!images.length) {
    return false;
  }

  const buttons = document.querySelectorAll(BUTTON_SELECTOR);
  return signature !== lastMountedSignature || key !== lastKey || buttons.length !== images.length;
};

export function useCanticoWidget() {
  const lastMountedSignatureRef = useRef<string | null>(null);
  const lastKeyRef = useRef<string | null>(null);

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
          lastMountedSignatureRef.current = null;
          lastKeyRef.current = null;
          frameId = null;
          return;
        }

        window.CANTICO_KEY = key;

        const images = document.querySelectorAll(IMAGE_SELECTOR);
        if (!images.length) {
          cleanupCanticoArtifacts();
          lastMountedSignatureRef.current = null;
          frameId = null;
          return;
        }

        const signature = getImageSignature(images);

        if (!shouldRefreshWidget(signature, lastMountedSignatureRef.current, lastKeyRef.current, key) || window.__canticoWidgetLoading) {
          frameId = null;
          return;
        }

        cleanupCanticoArtifacts();
        window.__canticoWidgetLoading = true;
        lastMountedSignatureRef.current = signature;
        lastKeyRef.current = key;

        const script = document.createElement("script");
        script.src = WIDGET_SRC;
        script.async = true;
        script.onload = () => {
          window.__canticoWidgetLoading = false;

          requestAnimationFrame(() => {
            const currentImages = document.querySelectorAll(IMAGE_SELECTOR);
            const currentSignature = getImageSignature(currentImages);

            if (shouldRefreshWidget(currentSignature, lastMountedSignatureRef.current, lastKeyRef.current, key)) {
              lastMountedSignatureRef.current = null;
              scheduleWidgetMount();
            }
          });
        };
        script.onerror = () => {
          window.__canticoWidgetLoading = false;
          lastMountedSignatureRef.current = null;
        };

        document.body.appendChild(script);
        frameId = null;
      });
    };

    const observer = new MutationObserver(() => {
      scheduleWidgetMount();
    });

    scheduleWidgetMount();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      observer.disconnect();
      lastMountedSignatureRef.current = null;
      lastKeyRef.current = null;
      window.__canticoWidgetLoading = false;
    };
  }, []);
}
