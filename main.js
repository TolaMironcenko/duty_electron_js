const { app, BrowserWindow } = require('electron')
const path = require("path");
const { ipcMain } = require('electron')
const fs = require('fs')
require('update-electron-app')()

const createWindow = () => {
    const window = new BrowserWindow({
        width: 350,
        height: 350,
        icon: __dirname+'/data/img/electron.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('get_balance', () => {
        return fs.readFileSync(__dirname+'/data/balance', 'utf-8')
    })
    ipcMain.handle('get_transactions', () => {
        return fs.readFileSync(__dirname+'/data/transactions', 'utf-8')
    })
    ipcMain.on('add_transaction', (event, sum) => {
        let balance = fs.readFileSync(__dirname+'/data/balance', 'utf-8')
        fs.writeFileSync(__dirname+'/data/balance', (parseFloat(balance)+parseFloat(sum)).toString())
        fs.appendFileSync(__dirname+'/data/transactions', sum.toString()+'\n')
    })
    window.loadFile(__dirname+'/web/index.html')
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