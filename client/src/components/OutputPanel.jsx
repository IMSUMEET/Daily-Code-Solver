// src/components/OutputPanel.jsx
import React from "react";

export default function OutputPanel({ output }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 p-4 h-48 overflow-auto transition-colors">
      <pre className="whitespace-pre-wrap text-gray-900 dark:text-green-400">
        {output}
      </pre>
    </div>
  );
}
