import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings as SettingsIcon, Shield, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  userName, 
  onLogout,
  onSettingsClick 
}) => {
  const { t } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        {t('header.title')}
      </h1>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span className="text-gray-300">{userName}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm text-gray-400">RIOT ID</p>
              <p className="font-semibold">{userName}#0000</p>
            </div>

            <button
              onClick={onSettingsClick}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2"
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => {}}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </button>

            <div className="border-t border-gray-700 mt-2">
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2 text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};