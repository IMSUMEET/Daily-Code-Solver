// server/src/runners/javaRunner.js
const { runInContainer } = require("../utils/docker");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

async function run(code) {
  const id = uuid();
  const workdir = path.join(__dirname, "../../tmp", id);
  await fs.mkdir(workdir, { recursive: true });
  const filePath = path.join(workdir, "Main.java");
  await fs.writeFile(filePath, code);

  // compile & run in one go
  const { stdout, stderr } = await runInContainer({
    image: "deployment/dockerfiles/java:latest",  // or your java image tag
    cmd: ["sh", "-c", "javac Main.java && java Main"],
    binds: { [workdir]: "/code" },
    workdir: "/code",
    timeout: 10000
  });

  await fs.rm(workdir, { recursive: true, force: true });
  return { stdout, stderr };
}

module.exports = { run };
