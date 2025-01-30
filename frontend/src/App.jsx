import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { authUser } = useAuthContext();

  // Function to inject cartoon if it doesn't already exist
  const addCartoonImage = () => {
    // Check if cartoon element already exists
    if (!document.getElementById("cartoon")) {
      const cartoon = document.createElement("div");
      cartoon.id = "cartoon";
      cartoon.className = "cartoon";
      
      // Create and append image
      const img = document.createElement("img");
      img.src = "/cartoon.png"; // Ensure path is correct
      img.alt = "Cartoon Image"; // Add alt text
      img.style.width = "100%";
      img.style.height = "100%";
      
      cartoon.appendChild(img);
      document.body.appendChild(cartoon);
    }
  };

  useEffect(() => {
    addCartoonImage();
    return () => {
      // Cleanup cartoon on unmount to avoid duplication
      const cartoon = document.getElementById("cartoon");
      if (cartoon) {
        cartoon.remove();
      }
    };
  }, []); // Runs once on mount

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
