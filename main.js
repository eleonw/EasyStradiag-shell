const { app, screen, BrowserWindow } = require('electron');

function createWindow () {
  let size = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
  })
  win.maximize();
  win.show();

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

