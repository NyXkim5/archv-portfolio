// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider.jsx";

// Primary pages you already have
import Home from "./pages/Home.jsx";
import Platform from "./pages/Platform.jsx";
import Security from "./pages/Security.jsx";
import Philosophy from "./pages/Philosophy.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";

// Product pages
import Ink from "./pages/Ink.jsx";
import Waitlist from "./pages/Waitlist.jsx";

// (Optional) other pages you might keep:
import Docs from "./pages/Docs.jsx"; // if file exists
import Pricing from "./pages/Pricing.jsx"; // if file exists

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Core routes that match your nav */}
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/security" element={<Security />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Product routes (opened via the side Productum drawer) */}
          <Route path="/ink" element={<Ink />} />
          <Route path="/waitlist" element={<Waitlist />} />

          {/* Optional extras (only keep if these files actually exist) */}
          <Route path="/docs" element={<Docs />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
