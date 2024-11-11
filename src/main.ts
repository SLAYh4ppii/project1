import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import Store from 'electron-store';
import { STS } from '@aws-sdk/client-sts';  // Import the STS client from AWS SDK v3

const store = new Store();

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    backgroundColor: '#0a0a0a'
  });

  mainWindow.loadFile(join(__dirname, '../public/index.html'));
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

// AWS Authentication
ipcMain.handle('aws-login', async (_, credentials) => {
  try {
    // Create an STS client with the provided credentials
    const sts = new STS({
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
      region: credentials.region || 'us-east-1'
    });

    const identity = await sts.getCallerIdentity({});
    
    store.set('aws-credentials', credentials);
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