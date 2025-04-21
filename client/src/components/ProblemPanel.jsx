// src/components/ProblemPanel.jsx
import React from "react";

export default function ProblemPanel({ title, description }) {
  return (
    <aside className="md:col-span-1 rounded-lg shadow p-4 bg-white dark:bg-gray-800 transition-colors">
      <h2 className="text-lg font-medium mb-2 dark:text-gray-100">{title}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </aside>
  );
}
