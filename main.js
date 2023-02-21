const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path");
const fs = require('fs')
const bcrypt = require("bcrypt");
require('update-electron-app')()

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
    ipcMain.handle('get_main_balance_name', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/name', 'utf-8')
    })
    ipcMain.handle('get_balance', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
    })
    ipcMain.handle('get_transactions', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/transactions', 'utf-8')
    })
    ipcMain.on('add_transaction', (event, sum) => {
        let balance = fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
        fs.writeFileSync(__dirname + '/data/chets/main/balance', ((parseFloat(balance) + parseFloat(sum)).toFixed(2)).toString())
        fs.appendFileSync(__dirname + '/data/chets/main/transactions', sum.toString() + '\n')
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
        fs.writeFileSync(__dirname + '/data/chets/main/transactions', '')
        fs.writeFileSync(__dirname + '/data/chets/main/balance', '0')
    })
    ipcMain.on('new_chet', (event, chet_name, balance) => {
        fs.mkdir(__dirname + '/data/chets/' + chet_name + '/', err => {
            if (err) throw err
            fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/transactions', '')
            fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/balance', balance.toString())
            fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/name', chet_name.toString())
        })
    })
    ipcMain.on('delete_chet', (event, chet_name) => {
        if (chet_name !== 'main') {
            fs.rmdir(__dirname + '/data/chets/' + chet_name, err => {
                if (err) throw err
            })
        }
    })

    window.loadFile(__dirname + '/web/index.html')
}

app.whenReady().then(() => {
    fs.readdir(__dirname + '/data/chets/main/', (err, files) => {
        if (err) {
            fs.mkdir(__dirname + '/data/chets/main', {recursive: true}, err => {
                if(err) throw err
                fs.writeFileSync(__dirname + '/data/chets/main/transactions', '')
                fs.writeFileSync(__dirname + '/data/chets/main/balance', '0')
                fs.writeFileSync(__dirname + '/data/chets/main/name', 'Main')
                fs.writeFileSync(__dirname + '/data/username', '')
                fs.writeFileSync(__dirname + '/data/password', '')
            })
        }
        console.log(files)
    })
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})