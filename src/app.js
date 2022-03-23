const { app, BrowserWindow, screen, session } = require('electron');
const path = require('path');

if (app.isPackaged) require("./autoUpdate.js");

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const settings = {
    // UA is needed so google will load the modern signin page, the default UA makes it think it is an old browser.
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/83.0.4103.116 Safari/537.36",
    width: screen.getPrimaryDisplay().size.width * 0.75,
    height: screen.getPrimaryDisplay().size.height * 0.75
  }
  
  // Create the browser window.
  const window = new BrowserWindow({
    width: settings.width,
    height: settings.height,
    icon: path.join(__dirname, 'assets/256.ico'),
    webPreferences: {
      webSecurity: false
    }
  });
  window.setMenu(null);
  // window.webContents.openDevTools();
  require("./connection/filter.js")(session, window);
  require("./connection/stripper.js")(session);

  // and load the index.html of the app.
  window.loadURL("https://play.prodigygame.com/", { userAgent: settings.userAgent });
  require("./connection/navigation.js")(window, settings);

};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});