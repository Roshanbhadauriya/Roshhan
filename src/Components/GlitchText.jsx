import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const RANDOM_CHARS = "_!X$0-+*#";

function getRandomChar(prevChar) {
  let char;
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

export function GlitchText({
  children,
  speed = 20,
  delay = 0,
  className = "",
  inView = false,
  once = true,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, margin: "-100px" });
  const shouldAnimate = inView ? isInView : true;
  const [hasStarted, setHasStarted] = useState(() => !inView && delay <= 0);
  const text = String(children || "");
  const [displayText, setDisplayText] = useState(" ".repeat(text.length));
  const [currentPhase, setCurrentPhase] = useState("phase1");
  const [animationStep, setAnimationStep] = useState(0);
  const intervalRef = useRef(null);
  const startTimeoutRef = useRef(null);

  function clearStartTimeout() {
    if (startTimeoutRef.current !== null) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
  }

  const startAnimation = React.useCallback(() => {
    setHasStarted(true);
    setDisplayText(" ".repeat(text.length));
    setCurrentPhase("phase1");
    setAnimationStep(0);
  }, [text.length]);

  const runPhase1 = React.useCallback(() => {
    const maxSteps = text.length * 2;
    const currentLength = Math.min(animationStep + 1, text.length);

    const chars = [];
    for (let i = 0; i < currentLength; i++) {
      const prevChar = i > 0 ? chars[i - 1] : undefined;
      chars.push(getRandomChar(prevChar));
    }

    for (let i = currentLength; i < text.length; i++) {
      chars.push("\u00A0");
    }

    setDisplayText(chars.join(""));

    if (animationStep < maxSteps - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setCurrentPhase("phase2");
      setAnimationStep(0);
    }
  }, [animationStep, text.length]);

  const runPhase2 = React.useCallback(() => {
    const revealedCount = Math.floor(animationStep / 2);
    const chars = [];

    for (let i = 0; i < revealedCount && i < text.length; i++) {
      chars.push(text[i]);
    }

    if (revealedCount < text.length) {
      if (animationStep % 2 === 0) {
        chars.push("_");
      } else {
        chars.push(getRandomChar());
      }
    }

    for (let i = chars.length; i < text.length; i++) {
      chars.push(getRandomChar());
    }

    setDisplayText(chars.join(""));

    if (animationStep < text.length * 2 - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setDisplayText(text);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [animationStep, text]);

  useEffect(() => {
    if (shouldAnimate && !hasStarted) {
      clearStartTimeout();
      if (delay <= 0) {
        window.setTimeout(() => startAnimation(), 0);
        return;
      }
      startTimeoutRef.current = window.setTimeout(() => {
        startTimeoutRef.current = null;
        startAnimation();
      }, delay * 1000);
    }
    return () => clearStartTimeout();
  }, [shouldAnimate, hasStarted, delay, startAnimation]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentPhase === "phase1") {
        runPhase1();
      } else {
        runPhase2();
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentPhase, hasStarted, runPhase1, runPhase2, speed]);

  // Handle text prop changes by restarting
  useEffect(() => {
    if (hasStarted && displayText !== text && currentPhase === "phase2" && animationStep >= text.length * 2 - 1) {
       window.setTimeout(() => startAnimation(), 0);
    }
  }, [text, hasStarted, displayText, currentPhase, animationStep, startAnimation]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex font-mono whitespace-pre ${className}`}
    >
      {displayText}
    </span>
  );
}

export default GlitchText;
