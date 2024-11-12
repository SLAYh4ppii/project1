import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { GameLibrary } from './components/GameLibrary';
import { Settings } from './components/Settings';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { useTranslation } from 'react-i18next';

const { ipcRenderer } = window.require ? window.require('electron') : { ipcRenderer: null };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { i18n } = useTranslation();
  
  const [games] = useState([
    {
      id: '1',
      title: 'Sample Game 1',
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      isInstalled: true
    },
    {
      id: '2',
      title: 'Sample Game 2',
      coverImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
      isInstalled: false
    }
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleLogin = async (profile: string) => {
    if (!ipcRenderer) {
      console.error('Electron IPC not available');
      return;
    }
    
    const result = await ipcRenderer.invoke('aws-login', profile);
    if (result.success) {
      setIsAuthenticated(true);
      setUserName(result.identity.Arn.split('/')[1] || 'User');
      setIsLoginModalOpen(false);
    } else {
      console.error('Login failed:', result.error);
    }
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark') => {
    if (ipcRenderer) {
      await ipcRenderer.invoke('set-theme', newTheme);
    }
    setTheme(newTheme);
  };

  const handleLanguageChange = async (language: 'en' | 'de') => {
    if (ipcRenderer) {
      await ipcRenderer.invoke('set-language', language);
    }
    i18n.changeLanguage(language);
  };

  const handleLaunchGame = (gameId: string) => {
    console.log(`Launching game ${gameId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header 
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login onLogin={handleLogin} />
      </Modal>

      <GameLibrary games={games} onLaunchGame={handleLaunchGame} />
      
      <Settings
        theme={theme}
        language={i18n.language as 'en' | 'de'}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

export default App;