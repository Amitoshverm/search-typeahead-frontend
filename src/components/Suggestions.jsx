import React from "react";

function highlightMatch(word, query) {
  const lower = word.toLowerCase();
  const queryLower = query.toLowerCase();
  if (!lower.startsWith(queryLower)) return word;
  return (
    <span>
      <span className="highlight">{word.slice(0, query.length)}</span>
      {word.slice(query.length)}
    </span>
  );
}

function Suggestions({ suggestions, query, selectedIndex, onSelect }) {
  if (suggestions.length === 0) return null;

  return (
    <ul className="suggestions">
      {suggestions.map((word, i) => (
        <li
          key={i}
          onClick={() => onSelect(word)}
          className={i === selectedIndex ? "active" : ""}>
          {highlightMatch(word, query)}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
