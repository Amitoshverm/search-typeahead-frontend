import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import TypewriterBackground from "../components/TypeWriterBackground";

function Login() {
  const [modal, setModal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function openModal(type) {
    setModal(type);
    setError("");
    setEmail("");
    setPassword("");
    setDisplayName("");
  }

  function closeModal() {
    setModal(null);
    setError("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      login(data.token);
      navigate("/search");
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed.");
        setLoading(false);
        return;
      }
      login(data.token);
      navigate("/search");
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-wrapper">
      <div className="blob-mid" />
      <TypewriterBackground />
      <div className="hero-center">
        <motion.div
          className="landing-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          Prefix search engine
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          Search Typeahead.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          In-memory Trie and Redis
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <motion.button
            className="btn-primary"
            onClick={() => openModal("signup")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}>
            Get Started
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => openModal("login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}>
            Login
          </motion.button>
        </motion.div>

        {/* stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          {[
            { number: "~2ms", label: "Redis hit" },

            { number: "Top 5", label: "Ranked results" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              <div className="hero-stat">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {i < 3 && <div className="stat-divider" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
      {/* modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
              <h2>{modal === "login" ? "Welcome Back" : "Create Account"}</h2>

              {error && (
                <motion.div
                  className="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}>
                  {error}
                </motion.div>
              )}

              <form onSubmit={modal === "login" ? handleLogin : handleSignup}>
                {modal === "signup" && (
                  <div className="form-group">
                    <label>Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Alex"
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="auth-btn"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  {loading
                    ? "Please wait..."
                    : modal === "login"
                      ? "Login"
                      : "Sign Up"}
                </motion.button>
              </form>

              <p className="auth-switch">
                {modal === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <span
                      className="switch-link"
                      onClick={() => openModal("signup")}>
                      Sign up
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      className="switch-link"
                      onClick={() => openModal("login")}>
                      Login
                    </span>
                  </>
                )}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
