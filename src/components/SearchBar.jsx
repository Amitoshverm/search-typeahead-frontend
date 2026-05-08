import React from "react";
import Suggestions from "./Suggestions";

function SearchBar({
  query,
  onChange,
  onKeyDown,
  onSearch,
  suggestions,
  selectedIndex,
  onSelect,
  loading,
}) {
  return (
    <div className="search-wrapper">
      <div className="input-row">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Start typing..."
          className="search-input"
        />
        <button
          className="search-btn"
          onClick={() => onSearch(query)}
          disabled={query.length === 0 || loading}>
          {/* {loading ? "Searching..." : "Search"} */}
          Search
        </button>
      </div>

      {/* empty state — no query yet */}
      {query.length === 0 && (
        <div className="search-hint">Start typing to see suggestions</div>
      )}

      {/* loading */}
      {loading && <div className="loading">Loading...</div>}

      {/* no results */}
      {!loading && query.length >= 2 && suggestions.length === 0 && (
        <div className="no-results">
          No suggestions found for <strong>"{query}"</strong> — press Enter to
          add it
        </div>
      )}

      {/* suggestions */}
      <Suggestions
        suggestions={suggestions}
        query={query}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
      />
    </div>
  );
}

export default SearchBar;
