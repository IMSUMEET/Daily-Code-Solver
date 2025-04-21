import React, { useState, useEffect } from "react";
import problems from "./problems";
import Header from "./components/Header";
import ProblemPanel from "./components/ProblemPanel";
import EditorPanel from "./components/EditorPanel";
import OutputPanel from "./components/OutputPanel";

export default function App() {
  const [lang, setLang] = useState("java");
  const [theme, setTheme] = useState("light"); // "light" or "vs-dark"
  const [current, setCurrent] = useState(0);
  const problem = problems[current];

  const [codeMap, setCodeMap] = useState(problem.stubs);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "vs-dark");
  }, [theme]);

  useEffect(() => {
    setCodeMap(problem.stubs);
    setOutput("");
  }, [problem]);

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeMap[lang], lang }),
    });
    const { stdout, stderr } = await res.json();
    setOutput(stderr || stdout);
    setLoading(false);
  };

  const nextProblem = () => setCurrent((i) => (i + 1) % problems.length);
  const prevProblem = () =>
    setCurrent((i) => (i - 1 + problems.length) % problems.length);

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "vs-dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onRun={runCode}
        running={loading}
      />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProblemPanel title={problem.title} description={problem.description} />
        <EditorPanel
          lang={lang}
          theme={theme}
          code={codeMap[lang]}
          initialStub={problem.stubs[lang]}
          onChange={(newCode) => setCodeMap((m) => ({ ...m, [lang]: newCode }))}
        />
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h2
          className={`text-lg font-medium mb-2 ${
            theme === "vs-dark" ? "text-white" : "text-black"
          }`}
        >
          Output
        </h2>
        <OutputPanel output={output} />
      </div>

      <footer className="flex justify-between max-w-7xl mx-auto p-6">
        <button onClick={prevProblem} className="underline">
          ← Previous
        </button>
        <button onClick={nextProblem} className="underline">
          Next →
        </button>
      </footer>
    </div>
  );
}
