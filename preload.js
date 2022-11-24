const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    get_balance: () => ipcRenderer.invoke('get_balance'),
    get_transactions: () => ipcRenderer.invoke('get_transactions'),
    add_transaction: (sum) => ipcRenderer.send('add_transaction', sum),
    // we can also expose variables, not just functions
})