const { spawn } = require("child_process");
const path = require("path");

const romPath = process.argv[2];

if (!romPath) {
  console.error("Passe o caminho da ROM como argumento.");
  process.exit(1);
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
  console.error("Extensão de ROM não suportada:", ext);
  process.exit(1);
}

console.log("Abrindo emulador...");
console.log("Emulador:", emulatorPath);
console.log("ROM:", romPath);

const emulator = spawn(emulatorPath, args, {
  stdio: "inherit"
});

emulator.on("close", (code) => {
  console.log(`Emulador fechado (code ${code})`);
  console.log("Retornando ao launcher...");
});
