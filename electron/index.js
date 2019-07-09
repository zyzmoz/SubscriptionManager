const electron = require('electron');

const { app, BrowserWindow } = electron;


app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: { backgroundThrottling: false },
    resizable: false,
    maximizable: false,
    show: false
  });
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  mainWindow.on('closed', () => app.quit());
})