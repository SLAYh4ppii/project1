import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import Store from 'electron-store';
import { STS } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-provider-ini';

const store = new Store();
const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#0a0a0a'
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// AWS IAM Authentication
ipcMain.handle('aws-login', async (_, profile = 'default') => {
  try {
    const credentials = await fromIni({ profile })();
    const sts = new STS({ credentials });
    const identity = await sts.getCallerIdentity({});
    
    store.set('aws-profile', profile);
    return { success: true, identity };
  } catch (err) {
    const error = err as Error;
    return { success: false, error: error.message };
  }
});

// Theme Management
ipcMain.handle('set-theme', (_, theme) => {
  store.set('theme', theme);
  return true;
});

// Language Management
ipcMain.handle('set-language', (_, language) => {
  store.set('language', language);
  return true;
});