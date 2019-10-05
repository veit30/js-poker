const { app, BrowserWindow } = require('electron')
// Behalten Sie eine globale Referenz auf das Fensterobjekt.
// Wenn Sie dies nicht tun, wird das Fenster automatisch geschlossen,
// sobald das Objekt dem JavaScript-Garbagekollektor übergeben wird.
const { fork } = require('child_process');
// const ps = fork(`${__dirname}/server.js`)
const io = require('socket.io-client');

let win

function createWindow () {
  // Erstellen des Browser-Fensters.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Öffnen der DevTools.
  win.webContents.openDevTools()

  // Ausgegeben, wenn das Fenster geschlossen wird.
  win.on('closed', () => {
    // Dereferenzieren des Fensterobjekts, normalerweise würden Sie Fenster
    // in einem Array speichern, falls Ihre App mehrere Fenster unterstützt.
    // Das ist der Zeitpunkt, an dem Sie das zugehörige Element löschen sollten.
    win = null
  })

  // createBackgroundProcess();
  //
  // setTimeout(() => {
  //   let socket = io('http://localhost:8080');
  //   socket.emit('msg',{msg:"sa"});
  //   socket.on('msg', data => {
  //     console.log(data);
  //   });
  //
  //
  // }, 2000)


}

function createBackgroundProcess() {
  serverProcess = fork(__dirname + '/js/src/server/server.js');
  console.log(__dirname)
  // serverProcess.on('message', msg => {
  //   console.log(msg)
  // })
}

// Diese Methode wird aufgerufen, wenn Electron mit der
// Initialisierung fertig ist und Browserfenster erschaffen kann.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', createWindow)

// Verlassen, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich, für Apps und ihre Menu Bar
  // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (win === null) {
    createWindow()
  }
})

// In dieser Datei können Sie den Rest des App-spezifischen
// Hauptprozess-Codes einbinden. Sie können den Code auch
// auf mehrere Dateien aufteilen und diese hier einbinden.
