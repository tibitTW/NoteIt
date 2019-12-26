const electron = require('electron')

const { app, BrowserWindow, Menu, Tray } = require('electron')

const nativeImage = require('electron').nativeImage
let icon = nativeImage.createFromPath('./resources/icon/icon@64x64.png')

var is_on_top = false, is_lock = false

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        title: 'Note It',
        width: 300,
        minWidth: 200,
        height: 400,
        minHeight: 200,
        x: 20,
        y: 20,
        // resizable: false,
        transparent: true,
        frame: false,
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'On Top', type: 'checkbox', click: function() {
            if (is_on_top) {
                win.setAlwaysOnTop(false)
                is_on_top = true
            } else {
                win.setAlwaysOnTop(true)
                is_on_top = false
            }

        }},
        // { label: 'Lock', type: 'checkbox', click: function() {
        //     if (is_lock) {
        //         win.setIgnoreMouseEvents(false)
        //         is_lock = false
        //     } else {
        //         win.setIgnoreMouseEvents(true)
        //         is_lock = true
        //     }
        // }},
        { type: 'separator' },
        { label: 'Close', click: function () {
            app.quit()
        }}
    ])
    tray.setToolTip('Note It')
    tray.setContextMenu(contextMenu)
}

let tray = null

app.on('ready', function() {
    createWindow()
})