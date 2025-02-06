import React, { useState } from "react";
import "./Header.css";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Sans Serif");

  const changeFont = (font) => {
    document.body.style.fontFamily = font;
    setSelectedFont(font);
    setIsFontMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="header-container">
      <div className="icon-container">
        <img src="/assets/book.png" alt="Dictionary Icon" className="book-icon" />
      </div>

      <div className="header-controls">
        <div className="toggle-switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            id="theme-toggle"
          />
          <label htmlFor="theme-toggle" className="slider"></label>
        </div>
        <FaMoon className="moon-icon" />
      </div>

      <div className={`font-selector ${isFontMenuOpen ? "open" : ""}`}>
        <button
          className="font-button"
          onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
        >
          {selectedFont} ▼
        </button>
        {isFontMenuOpen && (
          <div className="font-menu">
            <div className="font-option" onClick={() => changeFont("monospace")}>
              Monospace
            </div>
            <div className="font-option" onClick={() => changeFont("serif")}>
              Serif
            </div>
            <div className="font-option" onClick={() => changeFont("sans-serif")}>
              Sans Serif
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
