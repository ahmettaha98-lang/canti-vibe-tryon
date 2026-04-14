import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CustomCodeContextType {
  headCode: string;
  bodyCode: string;
  setHeadCode: (code: string) => void;
  setBodyCode: (code: string) => void;
}

const CustomCodeContext = createContext<CustomCodeContextType | null>(null);

const STORAGE_KEY_HEAD = "custom_head_code";
const STORAGE_KEY_BODY = "custom_body_code";

function injectScripts(html: string, container: HTMLDivElement) {
  // Clear previous injections
  container.innerHTML = "";

  // Parse the HTML string
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Process each node
  Array.from(temp.childNodes).forEach((node) => {
    if (node instanceof HTMLScriptElement) {
      const script = document.createElement("script");
      // Copy attributes
      Array.from(node.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });
      // Copy inline content
      if (node.textContent) {
        script.textContent = node.textContent;
      }
      container.appendChild(script);
    } else {
      container.appendChild(node.cloneNode(true));
    }
  });
}

export function CustomCodeProvider({ children }: { children: ReactNode }) {
  const [headCode, setHeadCode] = useState(() => localStorage.getItem(STORAGE_KEY_HEAD) || "");
  const [bodyCode, setBodyCode] = useState(() => localStorage.getItem(STORAGE_KEY_BODY) || "");

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HEAD, headCode);
  }, [headCode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BODY, bodyCode);
  }, [bodyCode]);

  // Inject head code
  useEffect(() => {
    let container = document.getElementById("custom-head-injection") as HTMLDivElement | null;
    if (!container) {
      container = document.createElement("div");
      container.id = "custom-head-injection";
      document.head.appendChild(container);
    }
    if (headCode.trim()) {
      injectScripts(headCode, container);
    } else {
      container.innerHTML = "";
    }
    return () => {
      container!.innerHTML = "";
    };
  }, [headCode]);

  // Inject body code
  useEffect(() => {
    let container = document.getElementById("custom-body-injection") as HTMLDivElement | null;
    if (!container) {
      container = document.createElement("div");
      container.id = "custom-body-injection";
      document.body.appendChild(container);
    }
    if (bodyCode.trim()) {
      injectScripts(bodyCode, container);
    } else {
      container.innerHTML = "";
    }
    return () => {
      container!.innerHTML = "";
    };
  }, [bodyCode]);

  return (
    <CustomCodeContext.Provider value={{ headCode, bodyCode, setHeadCode, setBodyCode }}>
      {children}
    </CustomCodeContext.Provider>
  );
}

export function useCustomCode() {
  const ctx = useContext(CustomCodeContext);
  if (!ctx) throw new Error("useCustomCode must be used within CustomCodeProvider");
  return ctx;
}
