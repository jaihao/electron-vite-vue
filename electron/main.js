const { app, BrowserWindow, Menu, Tray, session } = require('electron')
const path = require('path')
// 屏蔽控制台输出 【Electron Security Warning (Insecure Content-Security-Policy)】警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

let mainWindow = null
let tray = null
function createWindow() {
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  }


  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../public/favicon.ico'),
    title: 'electron + vue3 + vite',
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
    }
  })


  // 关闭窗口，应用保活
  mainWindow.on('close', (e) => {
    e.preventDefault()
    mainWindow.hide()
  });


  // 是否已打包，可用于区分开发、生产环境
  if (app.isPackaged) {
    mainWindow.loadFile('dist/index.html')
  } else {
    mainWindow.loadURL("http://localhost:9899")
    session.defaultSession.loadExtension(path.resolve(__dirname, '../vue_devtool'))
    mainWindow.webContents.openDevTools()
  }
}

function createTray() {
  const trayIcon = app.isPackaged ? path.join(__dirname, '../dist/favicon.ico') : path.join(__dirname, '../public/favicon.ico')
  tray = new Tray(trayIcon)
  tray.setToolTip('electron-vite-vue')
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', click: () => { mainWindow.destroy() }}
  ])
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.show()
  })
}


app.whenReady().then(() => {
  createWindow()
  createTray()
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
app.on('window-all-closed', () => {
  mainWindow = null
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.show()
  }
})
