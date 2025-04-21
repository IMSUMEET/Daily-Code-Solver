// src/components/EditorPanel.jsx
import React from "react";
import Editor from "@monaco-editor/react";

export default function EditorPanel({
  lang,
  theme,
  code,
  onChange,
  initialStub,
}) {
  return (
    <div className="md:col-span-2 flex flex-col rounded-lg shadow overflow-hidden bg-white dark:bg-gray-800 transition-colors">
      <div className="border-b p-4 bg-gray-100 dark:bg-gray-700 transition-colors">
        <h2 className="text-lg font-medium dark:text-gray-100">Code</h2>
      </div>
      <div className="h-96">
        <Editor
          height="100%"
          language={lang === "cpp" ? "cpp" : lang}
          theme={theme}
          value={code}
          onChange={(v) => onChange(v ?? initialStub)}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>
    </div>
  );
}
