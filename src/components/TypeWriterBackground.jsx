import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEMOS = [
  {
    query: "ap",
    suggestions: ["apple", "application", "apply", "appetite", "apt"],
  },
  { query: "ba", suggestions: ["ball", "batman", "band", "battle", "base"] },
  { query: "re", suggestions: ["react", "redis", "rest", "redux", "regex"] },
  { query: "sp", suggestions: ["spring", "split", "speed", "space", "spark"] },
  { query: "ca", suggestions: ["cache", "camera", "catch", "cat", "canvas"] },
  { query: "tr", suggestions: ["trie", "tree", "track", "trim", "true"] },
];

function TypewriterBackground() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [phase, setPhase] = useState("typing"); // typing | showing | clearing

  useEffect(() => {
    const demo = DEMOS[demoIndex];

    if (phase === "typing") {
      if (typed.length < demo.query.length) {
        const t = setTimeout(() => {
          setTyped(demo.query.slice(0, typed.length + 1));
        }, 180);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setShowSuggestions(true);
          setPhase("showing");
        }, 400);
        return () => clearTimeout(t);
      }
    }

    if (phase === "showing") {
      const t = setTimeout(() => {
        setPhase("clearing");
        setShowSuggestions(false);
      }, 2500);
      return () => clearTimeout(t);
    }

    if (phase === "clearing") {
      if (typed.length > 0) {
        const t = setTimeout(() => {
          setTyped((prev) => prev.slice(0, -1));
        }, 100);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setDemoIndex((prev) => (prev + 1) % DEMOS.length);
          setPhase("typing");
        }, 400);
        return () => clearTimeout(t);
      }
    }
  }, [phase, typed, demoIndex]);

  return (
    <div className="typewriter-bg">
      {/* search bar demo */}
      <div className="demo-search-wrapper">
        <div className="demo-search-bar">
          <span className="demo-search-icon">🔍</span>
          <span className="demo-typed">
            {typed}
            <span className="demo-cursor">|</span>
          </span>
        </div>

        <AnimatePresence>
          {showSuggestions && (
            <motion.ul
              className="demo-suggestions"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>
              {DEMOS[demoIndex].suggestions.map((word, i) => (
                <motion.li
                  key={word}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={i === 0 ? "demo-suggestion-highlight" : ""}>
                  <span className="demo-suggestion-match">
                    {word.slice(0, typed.length)}
                  </span>
                  {word.slice(typed.length)}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TypewriterBackground;
