const electron = require('electron')

const { app, BrowserWindow, Menu, Tray } = require('electron')

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        title: 'Note It',
        width: 300, minWidth: 200,
        height: 400, minHeight: 200,
        x: 20, y: 20,
        // resizable: false,
        // alwaysOnTop: true,
        transparent: true,
        frame: false,
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    tray = new Tray('./icon@64x64.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Lock', type: 'normal', id: 'lock-status'},
        { type: 'separator'},
        { label: 'close', rule: 'close', type: 'normal'}
    ])
    tray.setToolTip('Note It')
    tray.setContextMenu(contextMenu)
}

let tray = null

app.on('ready', createWindow)
