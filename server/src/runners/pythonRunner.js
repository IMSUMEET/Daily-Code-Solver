const { runInContainer } = require("../utils/docker");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

async function run(code) {
  const id = uuid();
  const workdir = path.join(__dirname, "../../tmp", id);
  await fs.mkdir(workdir, { recursive: true });
  const filePath = path.join(workdir, "main.py");
  await fs.writeFile(filePath, code);

  // uses the python:3-alpine image
  const { stdout, stderr } = await runInContainer({
    image: "deployment/dockerfiles/python:latest",
    cmd: ["python3", "/code/main.py"],
    binds: { [workdir]: "/code" },
    workdir: "/code",
    timeout: 5000
  });

  // clean up...
  await fs.rm(workdir, { recursive: true, force: true });
  return { stdout, stderr };
}

module.exports = { run };
