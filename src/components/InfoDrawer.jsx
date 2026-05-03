import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function InfoDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* toggle button */}
      <motion.button
        className="drawer-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        {open ? "Close" : "How it works"}
      </motion.button>

      {/* drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* panel */}
            <motion.div
              className="drawer-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}>
              <div className="drawer-content">
                {/* header */}
                <div className="drawer-header">
                  <h3>About this project</h3>
                  <p>Search Typeahead — built from scratch</p>
                </div>

                {/* what works */}
                <div className="drawer-section">
                  <div className="drawer-section-title">What works now</div>
                  <div className="drawer-section-body">
                    <ul className="drawer-list">
                      <li>Prefix search — minimum 2 characters</li>
                      <li>Top 5 suggestions ranked by frequency</li>
                      <li>Redis prefix caching — 5 min TTL</li>
                      <li>Search increments word frequency globally</li>
                      <li>New words inserted into Trie on search</li>
                      <li>JWT protected routes</li>
                    </ul>
                  </div>
                </div>

                {/* why trie */}
                <div className="drawer-section">
                  <div className="drawer-section-title">
                    Why Trie over HashMap?
                  </div>
                  <div className="drawer-section-body">
                    <p>
                      A HashMap stores complete words as keys — to find all
                      words starting with "ap" you'd scan every entry. That's
                      O(n) for every keystroke.
                    </p>
                    <p>
                      A Trie stores characters as nodes. Finding all words with
                      prefix "ap" means navigating just 2 nodes, then collecting
                      everything below — O(m) where m is prefix length.
                    </p>
                    <div className="drawer-comparison">
                      <div className="drawer-comparison-item bad">
                        <span>HashMap</span>
                        <code>O(n) prefix scan</code>
                      </div>
                      <div className="drawer-comparison-item good">
                        <span>Trie</span>
                        <code>O(m) prefix walk</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* limitations */}
                <div className="drawer-section">
                  <div className="drawer-section-title">
                    Current limitations
                  </div>
                  <div className="drawer-section-body">
                    <ul className="drawer-list warning">
                      <li>
                        Single words only — phrase search not supported yet.
                        Searching "spring boot" won't work, only "spring" or
                        "boot" individually
                      </li>
                      <li>Lowercase only — no case handling</li>
                      <li>No fuzzy matching — typos return no results</li>
                      <li>No user-specific history ranking</li>
                      <li>Trie rebuilds from MySQL on every server restart</li>
                    </ul>
                  </div>
                </div>

                {/* design decisions */}
                <div className="drawer-section">
                  <div className="drawer-section-title">Design decisions</div>
                  <div className="drawer-section-body">
                    <ul className="drawer-list">
                      <li>
                        <strong>Array[26] in Trie</strong> — faster than HashMap
                        for fixed alphabet, O(1) child lookup vs O(1) average
                        but with hash collision overhead
                      </li>
                      <li>
                        <strong>Lazy Redis caching</strong> — only cache what
                        users actually search, not everything upfront. Saves
                        memory
                      </li>
                      <li>
                        <strong>Cache invalidation</strong> — when a word is
                        searched, all its prefixes are invalidated so frequency
                        rankings stay fresh
                      </li>
                      <li>
                        <strong>ApplicationReadyEvent</strong> — Trie loads from
                        MySQL only after full app startup completes, not on bean
                        initialization
                      </li>
                    </ul>
                  </div>
                </div>
                {/* stack */}
                <div className="drawer-section">
                  <div className="drawer-section-title">Tech stack</div>
                  <div className="drawer-tags">
                    {[
                      "Spring Boot",
                      "Java 17",
                      "Trie",
                      "Redis",
                      "MySQL",
                      "JWT",
                      "React",
                      "Framer Motion",
                    ].map((tag) => (
                      <span key={tag} className="drawer-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default InfoDrawer;
