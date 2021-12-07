const { app, screen, BrowserWindow, Menu } = require('electron');

Menu.setApplicationMenu(null);

function createWindow () {
  let size = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      },
      icon: 'logo.ico'
  })
  win.maximize();
  win.show();

  win.loadFile('pages/basic_info.html')
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

