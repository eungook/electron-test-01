const path = require('path');

const { app, BrowserWindow } = require('electron');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
	});

	win.loadFile('index.html');

  // Open the DevTools.
	win.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow(); // needed: whenReady
	});
});

app.on('window-all-closed', () => {
	console.log({ 'process.platform': process.platform });
	if (process.platform !== 'darwin') app.quit();
});
// 참고: 'window-all-closed' 이벤트를 따로 구현, 처리하지 않으면, 알아서 app.quit();를 해버린다.