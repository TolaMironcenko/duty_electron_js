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
    ipcMain.handle('get_main_balance_name', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/name', 'utf-8')
    })
    ipcMain.handle('get_balance', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
    })
    // ipcMain.handle('get_all_chets', () => {
    //     let chets = fs.readdirSync(__dirname + '/data/chets/')
    //     console.log(chets)
    //     return chets
    // })
    ipcMain.handle('get_transactions', () => {
        return fs.readFileSync(__dirname + '/data/chets/main/transactions', 'utf-8')
    })
    ipcMain.on('add_transaction', (event, sum) => {
        let balance = fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
        fs.writeFileSync(__dirname + '/data/chets/main/balance', ((parseFloat(balance) + parseFloat(sum)).toFixed(2)).toString())
        fs.appendFileSync(__dirname + '/data/chets/main/transactions', sum.toString() + '\n')
    })
    ipcMain.handle('add_transaction_for_chet', (event, sum, chet_name) => {
        // console.log(sum, chet_name)
        if (chet_name !== 'main') {
            let balance = fs.readFileSync(__dirname + '/data/chets/' + chet_name + '/balance', 'utf-8')
            let mainbalance = fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
            fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/balance', ((parseFloat(balance) + parseFloat(sum)).toFixed(2)).toString())
            fs.writeFileSync(__dirname + '/data/chets/main/balance', ((parseFloat(mainbalance) + parseFloat(sum)).toFixed(2)).toString())
            fs.appendFileSync(__dirname + '/data/chets/' + chet_name + '/transactions', sum.toString() + '\n')
            fs.appendFileSync(__dirname + '/data/chets/main/transactions', sum.toString() + '\n')
        } else {
            let mainbalance = fs.readFileSync(__dirname + '/data/chets/main/balance', 'utf-8')
            fs.writeFileSync(__dirname + '/data/chets/main/balance', ((parseFloat(mainbalance) + parseFloat(sum)).toFixed(2)).toString())
            fs.appendFileSync(__dirname + '/data/chets/main/transactions', sum.toString() + '\n')
        }
    })
    ipcMain.handle('get_transactions_for_chet', (event, chet_name) => {
        return fs.readFileSync(__dirname + '/data/chets/' + chet_name + '/transactions', 'utf-8')
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
    ipcMain.handle('new_chet', (event, chet_name, balance) => {
        fs.mkdirSync(__dirname + '/data/chets/' + chet_name + '/')
        fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/transactions', '')
        fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/balance', balance.toString())
        fs.writeFileSync(__dirname + '/data/chets/' + chet_name + '/name', chet_name.toString())
    })
    ipcMain.on('delete_chet', (event, chet_name) => {
        if (chet_name !== 'main') {
            fs.rmdir(__dirname + '/data/chets/' + chet_name, {recursive: true}, err => {
                if (err) throw err
            })
        }
    })
    ipcMain.handle('get_all_chets', () => {
        const chets = fs.readdirSync(__dirname + '/data/chets/')
        let ret = []
        for (let i = 0; i < chets.length; i++) {
            ret.push(
                {
                    name: fs.readFileSync(__dirname + '/data/chets/' + chets[i] + '/name').toString(), 
                    balance: fs.readFileSync(__dirname + '/data/chets/' + chets[i] + '/balance').toString(),
                    transactions: fs.readFileSync(__dirname + '/data/chets/' + chets[i] + '/transactions').toString(),
                }
            )
        }
        return ret
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
                fs.writeFileSync(__dirname + '/data/chets/main/name', 'main')
                fs.writeFileSync(__dirname + '/data/username', '')
                fs.writeFileSync(__dirname + '/data/password', '')
            })
        }
    })
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})