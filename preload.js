const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    get_balance: () => ipcRenderer.invoke('get_balance'),
    get_transactions: () => ipcRenderer.invoke('get_transactions'),
    add_transaction: (sum) => ipcRenderer.send('add_transaction', sum),
    set_app_password: (password) => ipcRenderer.send('set_app_password', password),
    validate_password: (password) => ipcRenderer.invoke('validate_password', password),
    have_password: () => ipcRenderer.invoke('have_password'),
    delete_password: () => ipcRenderer.invoke('delete_password')
    // we can also expose variables, not just functions
})