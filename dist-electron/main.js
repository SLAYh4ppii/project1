"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const electron_store_1 = __importDefault(require("electron-store"));
const client_sts_1 = require("@aws-sdk/client-sts");
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const store = new electron_store_1.default();
const isDev = process.env.NODE_ENV === 'development';
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
    }
    else {
        mainWindow.loadFile((0, path_1.join)(__dirname, '../dist/index.html'));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// AWS IAM Authentication
electron_1.ipcMain.handle('aws-login', async (_, profile = 'default') => {
    try {
        const credentials = await (0, credential_provider_ini_1.fromIni)({ profile })();
        const sts = new client_sts_1.STS({ credentials });
        const identity = await sts.getCallerIdentity({});
        store.set('aws-profile', profile);
        return { success: true, identity };
    }
    catch (err) {
        const error = err;
        return { success: false, error: error.message };
    }
});
// Theme Management
electron_1.ipcMain.handle('set-theme', (_, theme) => {
    store.set('theme', theme);
    return true;
});
// Language Management
electron_1.ipcMain.handle('set-language', (_, language) => {
    store.set('language', language);
    return true;
});
