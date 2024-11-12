import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe } from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark';
  language: 'en' | 'de';
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLanguageChange: (language: 'en' | 'de') => void;
}

export const Settings: React.FC<SettingsProps> = ({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.theme')}
          </span>
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={t(`settings.themes.${theme === 'dark' ? 'light' : 'dark'}`)}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.language')}
          </span>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as 'en' | 'de')}
              className="form-select text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="en">{t('settings.languages.en')}</option>
              <option value="de">{t('settings.languages.de')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};