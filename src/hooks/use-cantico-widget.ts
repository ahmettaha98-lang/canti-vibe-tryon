import { useEffect, useRef } from "react";

declare global {
  interface Window {
    CANTICO_KEY?: string;
    __canticoWidgetLoading?: boolean;
  }
}

const CANTICO_API_KEY = "ctc_effa061f77833d4dd8e5f08a";
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

export function useCanticoWidget() {
  const lastMountedSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    let frameId: number | null = null;

    window.CANTICO_KEY = CANTICO_API_KEY;

    const scheduleWidgetMount = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const images = document.querySelectorAll(IMAGE_SELECTOR);
        if (!images.length) {
          cleanupCanticoArtifacts();
          lastMountedSignatureRef.current = null;
          frameId = null;
          return;
        }

        const signature = getImageSignature(images);

        if (signature === lastMountedSignatureRef.current || window.__canticoWidgetLoading) {
          frameId = null;
          return;
        }

        cleanupCanticoArtifacts();
        window.__canticoWidgetLoading = true;
        lastMountedSignatureRef.current = signature;

        const script = document.createElement("script");
        script.src = WIDGET_SRC;
        script.async = true;
        script.onload = () => {
          window.__canticoWidgetLoading = false;

          requestAnimationFrame(() => {
            const currentImages = document.querySelectorAll(IMAGE_SELECTOR);
            if (!currentImages.length) return;

            const currentSignature = getImageSignature(currentImages);
            if (currentSignature !== lastMountedSignatureRef.current) {
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
      window.__canticoWidgetLoading = false;
    };
  }, []);
}
