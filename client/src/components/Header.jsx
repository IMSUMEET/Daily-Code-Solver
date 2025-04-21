// src/components/Header.jsx
import React from "react";

export default function Header({
  lang,
  setLang,
  theme,
  setTheme,
  onRun,
  running,
}) {
  return (
    <header
      className={`shadow transition-colors ${
        theme === "vs-dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Daily Code Solver</h1>
        <div className="flex items-center space-x-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>

          <button
            onClick={onRun}
            disabled={running}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {running ? "Running…" : "Run"}
          </button>

          <button
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "vs-dark" : "light"))
            }
            className="px-3 py-1 border rounded"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
