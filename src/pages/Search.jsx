import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import InfoDrawer from "../components/InfoDrawer";

function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/search/suggest?prefix=${query}`, {
        headers: { Authorization: `Bearer ${token}` }, // ← send JWT
      })
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(Array.isArray(data) ? data : []);
          // setSuggestions(data);
          setSelectedIndex(-1);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query, token]);

  function handleSelect(word) {
    fetch(`${process.env.REACT_APP_API_URL}/search/query?word=${word}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // ← send JWT
    });
    setQuery(word);
    setSuggestions([]);
    setSelectedIndex(-1);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelect(suggestions[selectedIndex]);
      } else if (query.length > 0) {
        handleSelect(query);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="search-page">
      {" "}
      {/* ← use hero-wrapper instead of container */}
      {/* <NeuralBackground /> */}
      <div className="blob-mid" />
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="content">
        <h1>Search Typeahead</h1>
        <p className="subtitle">Powered by Trie + Redis</p>
        <SearchBar
          query={query}
          onChange={setQuery}
          onKeyDown={handleKeyDown}
          onSearch={handleSelect}
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          loading={loading}
        />
      </div>
      <InfoDrawer />
    </div>
  );
}

export default Search;
