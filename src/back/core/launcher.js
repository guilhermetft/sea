const { spawn } = require("child_process");
const path = require("path");

module.exports = function launchRom(romPath) {
  if (!romPath) {
    console.error("ROM não informada");
    return;
  }

  const ext = path.extname(romPath).toLowerCase();

  let emulatorPath;
  let args = [];

  if (ext === ".gba") {
    emulatorPath = path.resolve("emulators/mgba/mgba.exe");
    args = [romPath];
  } 
  else if (ext === ".nds") {
    emulatorPath = path.resolve("emulators/melonds/melonDS.exe");
    args = [romPath];
  } 
  else {
    console.error("Extensão não suportada:", ext);
    return;
  }

  console.log("Abrindo:", emulatorPath);
  console.log("ROM:", romPath);

  const emulator = spawn(emulatorPath, args, {
    stdio: "inherit"
  });

  emulator.on("close", (code) => {
    console.log(`Emulador fechado (code ${code})`);
  });
};
