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
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('settings.theme')}
          </span>
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            title={t(`settings.themes.${theme === 'dark' ? 'light' : 'dark'}`)}
          >
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
              className="form-select text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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