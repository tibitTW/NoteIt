const { remote } = require('electron')

// close this app if needed
document.getElementById('close-btn').addEventListener('click', () => {
    remote.app.quit()
})

