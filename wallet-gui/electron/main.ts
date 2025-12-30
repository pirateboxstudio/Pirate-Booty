// 🏴‍☠️ Electron Main Process
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import { spawn, ChildProcess } from 'child_process'

let mainWindow: BrowserWindow | null = null
let walletRpcProcess: ChildProcess | null = null

const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    title: '🏴‍☠️ Pirate Booty Wallet - Black Pearl',
    backgroundColor: '#0A1929',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../assets/icon.png'),
  })

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Start wallet RPC server
function startWalletRpc(walletPath: string, password: string, daemonAddress: string) {
  return new Promise((resolve, reject) => {
    const rpcPort = 18083
    
    walletRpcProcess = spawn('piratebooty-wallet-rpc', [
      '--wallet-file', walletPath,
      '--password', password,
      '--daemon-address', daemonAddress,
      '--rpc-bind-port', rpcPort.toString(),
      '--rpc-bind-ip', '127.0.0.1',
      '--disable-rpc-login',
    ])

    walletRpcProcess.stdout?.on('data', (data) => {
      console.log(`Wallet RPC: ${data}`)
      if (data.toString().includes('Starting wallet RPC server')) {
        resolve(rpcPort)
      }
    })

    walletRpcProcess.stderr?.on('data', (data) => {
      console.error(`Wallet RPC Error: ${data}`)
    })

    walletRpcProcess.on('error', (error) => {
      console.error('Failed to start wallet RPC:', error)
      reject(error)
    })

    walletRpcProcess.on('close', (code) => {
      console.log(`Wallet RPC process exited with code ${code}`)
      walletRpcProcess = null
    })

    // Timeout if RPC doesn't start
    setTimeout(() => {
      if (walletRpcProcess) {
        resolve(rpcPort)
      } else {
        reject(new Error('Wallet RPC failed to start'))
      }
    }, 10000)
  })
}

// Stop wallet RPC server
function stopWalletRpc() {
  if (walletRpcProcess) {
    walletRpcProcess.kill()
    walletRpcProcess = null
  }
}

// IPC Handlers
ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Wallet Files', extensions: ['keys'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  return result.filePaths[0]
})

ipcMain.handle('dialog:saveFile', async () => {
  const result = await dialog.showSaveDialog({
    filters: [
      { name: 'Wallet Files', extensions: ['keys'] },
    ]
  })
  return result.filePath
})

ipcMain.handle('wallet:start-rpc', async (event, { walletPath, password, daemonAddress }) => {
  try {
    const port = await startWalletRpc(walletPath, password, daemonAddress)
    return { success: true, port }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('wallet:stop-rpc', async () => {
  stopWalletRpc()
  return { success: true }
})

ipcMain.handle('app:get-version', () => {
  return app.getVersion()
})

ipcMain.handle('app:get-path', (event, name: string) => {
  return app.getPath(name as any)
})

// App lifecycle
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  stopWalletRpc()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  stopWalletRpc()
})
