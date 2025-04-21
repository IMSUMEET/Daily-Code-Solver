// server/src/runners/cppRunner.js
const { runInContainer } = require("../utils/docker");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

async function run(code) {
  const id = uuid();
  const workdir = path.join(__dirname, "../../tmp", id);
  await fs.mkdir(workdir, { recursive: true });
  const filePath = path.join(workdir, "main.cpp");
  await fs.writeFile(filePath, code);

  // compile then execute
  const { stdout, stderr } = await runInContainer({
    image: "deployment/dockerfiles/cpp:latest",  // or your cpp image tag
    cmd: ["sh", "-c", "g++ -std=c++17 main.cpp -o main && ./main"],
    binds: { [workdir]: "/code" },
    workdir: "/code",
    timeout: 10000
  });

  await fs.rm(workdir, { recursive: true, force: true });
  return { stdout, stderr };
}

module.exports = { run };
