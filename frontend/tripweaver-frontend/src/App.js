import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import DestinationSearch from "./components/DestinationSearch";
import "./App.css";
import "boxicons/css/boxicons.min.css";

function App() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <Router>
      <Routes>
        {/* LOGIN / SIGNUP PAGE */}
        <Route
          path="/"
          element={
            <div className={`container ${isSignup ? "active" : ""}`}>
              <div className="form-box">
                {isSignup ? <Signup /> : <Signin />}

                <p className="toggle-text">
                  {isSignup ? (
                    <>
                      Already have an account?{" "}
                      <span onClick={() => setIsSignup(false)}>Login</span>
                    </>
                  ) : (
                    <>
                      Don’t have an account?{" "}
                      <span onClick={() => setIsSignup(true)}>Register</span>
                    </>
                  )}
                </p>
              </div>

              <div className="info-box">
                {isSignup ? (
                  <>
                    <h2>Hello, Explorer!</h2>
                    <p>Start your journey by creating an account with us.</p>
                  </>
                ) : (
                  <>
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us, please login using your credentials.</p>
                  </>
                )}
              </div>
            </div>
          }
        />

        {/* DESTINATION SEARCH PAGE */}
        <Route path="/search" element={<DestinationSearch />} />
      </Routes>
    </Router>
  );
}

export default App;