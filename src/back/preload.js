const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  launchRom: (romPath) => ipcRenderer.send("launch-rom", romPath)
});

