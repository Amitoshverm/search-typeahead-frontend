import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// this stores the token globally so every component can access it:
export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(
    storedToken && !isTokenExpired(storedToken) ? storedToken : null,
  );

  // if token was expired, clean it up
  if (storedToken && isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
  }

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
