import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Platform from "./pages/Platform.jsx";
import Security from "./pages/Security.jsx";
import Philosophy from "./pages/Philosophy.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx"; // ← add

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/security" element={<Security />} />
      <Route path="/philosophy" element={<Philosophy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} /> {/* ← add */}
    </Routes>
  );
}
