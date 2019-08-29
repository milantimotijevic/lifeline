const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

app.on('ready', async () => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'pages', 'html', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.removeMenu();

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });

     //mainWindow.webContents.openDevTools();
});
