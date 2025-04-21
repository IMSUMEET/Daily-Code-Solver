// using dockerode as an example
const Docker = require("dockerode");
const docker = new Docker();
async function runInContainer({ image, cmd, binds, workdir, timeout }) {
  const bindsArr = Object.entries(binds).map(
    ([hostPath, containerPath]) => `${hostPath}:${containerPath}`
  );
  const container = await docker.createContainer({
    Image: image,
    Cmd: cmd,
    HostConfig: { Binds: bindsArr },
    WorkingDir: workdir
  });
  await container.start();

  const stream = await container.attach({
    stream: true,
    stdout: true,
    stderr: true
  });

  let stdout = "", stderr = "";
  stream.on("data", (chunk) => { stdout += chunk.toString(); });

  await container.wait({ timeout });
  const logs = await container.logs({ stdout: true, stderr: true });
  // you can parse logs if needed

  await container.remove({ force: true });
  return { stdout, stderr };
}

module.exports = { runInContainer };
