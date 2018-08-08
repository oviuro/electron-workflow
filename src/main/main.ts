import { BrowserWindow, app } from 'electron'

let mainWindow: BrowserWindow | null

function installReactDevtools() {
	const reactDevtoolsPath = '/home/dany/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.4_0'
	BrowserWindow.addDevToolsExtension(reactDevtoolsPath)
}

function createWindow() {
	installReactDevtools()

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,

		show: false
	})

	mainWindow.once('ready-to-show', () => {
		if(!mainWindow) return

		mainWindow.show()
		mainWindow.webContents.openDevTools()
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.setMenu(null)
	mainWindow.loadURL(`http://localhost:1234`)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	process.platform !== 'darwin' ? app.quit() : null
})

app.on('activate', () => {
	mainWindow === null ? createWindow() : null
})