import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { GameLibrary } from './components/GameLibrary';
import { Settings } from './components/Settings';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { PatchNotes } from './components/PatchNotes';
import { GameDetails } from './components/GameDetails';
import { useTranslation } from 'react-i18next';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'library' | 'patchNotes' | 'gameDetails'>('library');
  const { i18n } = useTranslation();
  
  const [games] = useState([
    {
      id: '1',
      title: 'Cyberpunk 2077',
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      isInstalled: true,
      description: 'Experience the future in this open-world action RPG. Explore Night City and become a cyberpunk legend.',
      version: '2.0'
    }
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setUserName(username);
      localStorage.setItem('username', username);
    } else {
      alert('Invalid credentials. Please use admin/admin');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('username');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLanguageChange = (language: 'en' | 'de') => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleLaunchGame = (gameId: string) => {
    if (!isAuthenticated) {
      return;
    }
    console.log(`Launching game ${gameId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[url('/game-bg.jpg')] bg-cover bg-center">
        <div className="min-h-screen bg-black/50 flex items-center justify-center">
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogout={handleLogout}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <Settings
          theme={theme}
          language={i18n.language as 'en' | 'de'}
          onThemeChange={handleThemeChange}
          onLanguageChange={handleLanguageChange}
        />
      </Modal>

      {currentView === 'patchNotes' && <PatchNotes onViewChange={setCurrentView} />}
      {currentView === 'gameDetails' && <GameDetails game={games[0]} onViewChange={setCurrentView} onLaunchGame={handleLaunchGame} />}
      {currentView === 'library' && <GameLibrary games={games} onLaunchGame={handleLaunchGame} onViewChange={setCurrentView} />}
    </div>
  );
}

export default App;