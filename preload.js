const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    set_username: (username) => ipcRenderer.send('set_username', username),
    get_username: () => ipcRenderer.invoke('get_username'),
    get_balance: () => ipcRenderer.invoke('get_balance'),
    get_transactions: () => ipcRenderer.invoke('get_transactions'),
    add_transaction: (sum) => ipcRenderer.send('add_transaction', sum),
    set_app_password: (password) => ipcRenderer.send('set_app_password', password),
    validate_password: (password) => ipcRenderer.invoke('validate_password', password),
    have_password: () => ipcRenderer.invoke('have_password'),
    delete_password: () => ipcRenderer.invoke('delete_password'),
    clear_all: () => ipcRenderer.invoke('clear_all'),
    get_main_balance_name: () => ipcRenderer.invoke('get_main_balance_name'),
    new_chet: (chet_name, balance) => ipcRenderer.send('new_chet', chet_name, balance),
    delete_chet: (chet_name) => ipcRenderer.send('delete_chet', chet_name)
    // we can also expose variables, not just functions
})