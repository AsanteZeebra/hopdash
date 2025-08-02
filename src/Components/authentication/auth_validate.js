import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

const useAuthValidation = () => {

  <ToastContainer/>
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();
  const timer = useRef(null);
  const timeoutDuration = 30 * 60 * 1000; // 30 minutes

  const handleLogout = useCallback(() => {
    //console.log("Logging out...");

    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("uid");

    // Clear state
    setToken(null);

    // Redirect
    navigate("/login", { replace: true });
  }, [navigate]);

  // Validate token
  useEffect(() => {
    const validate = async () => {
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Optionally validate based on user data
        if (!response.data || response.status !== 200) {
          throw new Error("Invalid token");
        }

        //console.log("Token is valid.");
      } catch (error) {
        toast.error("Unauthorized Token.");
        //console.error("Token validation failed:", error);
        handleLogout(); // ensure logout is called
      }
    };

    validate();
  }, [token, handleLogout]);

  // Reset inactivity timer
  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    if (!token) return;

    timer.current = setTimeout(() => {
      //console.log("Logged out due to inactivity");
      handleLogout();
    }, timeoutDuration);
  }, [token, handleLogout]);

  // Track user activity
  useEffect(() => {
    if (!token) return;

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [token, resetTimer]);

  return { token, setToken, handleLogout };
};

export default useAuthValidation;
