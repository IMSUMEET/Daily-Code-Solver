// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const javaRunner = require("./src/runners/javaRunner");
const cppRunner = require("./src/runners/cppRunner");
const pythonRunner = require("./src/runners/pythonRunner");

const app = express();
app.use(bodyParser.json());

app.post("/api/run", async (req, res) => {
  const { code, lang } = req.body;
  try {
    let result;
    if (lang === "java") {
      result = await javaRunner.run(code);
    } else if (lang === "cpp") {
      result = await cppRunner.run(code);
    } else if (lang === "python") {
      result = await pythonRunner.run(code);
    } else {
      throw new Error(`Unsupported language: ${lang}`);
    }
    res.json({ stdout: result.stdout, stderr: result.stderr });
  } catch (err) {
    res.status(500).json({ stdout: "", stderr: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
