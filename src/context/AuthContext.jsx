import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

// this stores the token globally so every component can access it:
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

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
  return useContext(AuthContext);
}
