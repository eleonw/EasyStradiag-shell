const { app, screen, BrowserWindow, Menu } = require('electron');

Menu.setApplicationMenu(null);

function createWindow () {
  let size = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
      show: false,
      // fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      icon: 'logos/logo.ico'
  })
  win.maximize();
  win.loadFile('./ui_dev/ui.html');
  win.show();

  // win.webContents.openDevTools();
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

