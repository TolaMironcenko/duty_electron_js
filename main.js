const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path");
const fs = require('fs')
const bcrypt = require("bcrypt");
// require('update-electron-app')()

const createWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        width: 350,
        height: 350,
        icon: __dirname + '/data/img/electron.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    window.setMenuBarVisibility(false)

    ipcMain.on('set_username', (event, username) => {
        fs.writeFileSync(__dirname + '/data/username', username.toString())
    })
    ipcMain.handle('get_username', () => {
        return fs.readFileSync(__dirname + '/data/username')
    })
    ipcMain.handle('get_balance', () => {
        return fs.readFileSync(__dirname + '/data/balance', 'utf-8')
    })
    ipcMain.handle('get_transactions', () => {
        return fs.readFileSync(__dirname + '/data/transactions', 'utf-8')
    })
    ipcMain.on('add_transaction', (event, sum) => {
        let balance = fs.readFileSync(__dirname + '/data/balance', 'utf-8')
        fs.writeFileSync(__dirname + '/data/balance', (parseFloat(balance) + parseFloat(sum)).toString())
        fs.appendFileSync(__dirname + '/data/transactions', sum.toString() + '\n')
    })
    ipcMain.on('set_app_password', async (event, password) => {
        const salt = await bcrypt.genSalt(10);
        let hashed_password = await bcrypt.hash(password, salt);
        fs.writeFileSync(__dirname + '/data/password', hashed_password)
    })
    ipcMain.handle('validate_password', (event, password) => {
        const hashed_password = fs.readFileSync(__dirname + '/data/password', 'utf-8')
        return bcrypt.compareSync(password, hashed_password)
    })
    ipcMain.handle('have_password', () => {
        return (fs.readFileSync(__dirname + '/data/password', 'utf-8') !== '')
    })
    ipcMain.handle('delete_password', () => {
        fs.writeFileSync(__dirname + '/data/password', '')
    })
    ipcMain.handle('clear_all', () => {
        fs.writeFileSync(__dirname + '/data/transactions', '')
        fs.writeFileSync(__dirname + '/data/balance', '0')
    })

    window.loadFile(__dirname + '/web/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})