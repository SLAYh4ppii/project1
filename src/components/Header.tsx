import React from 'react';
import { User, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, userName, onLoginClick }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">{t('header.title')}</h1>
      
      <button
        onClick={onLoginClick}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {isAuthenticated ? (
          <>
            <User className="w-5 h-5" />
            <span>{userName}</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>{t('header.login')}</span>
          </>
        )}
      </button>
    </header>
  );
};