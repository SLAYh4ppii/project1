import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Key } from 'lucide-react';

interface LoginProps {
  onLogin: (profile: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState('default');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(profile);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-center mb-8">
        <Key className="w-12 h-12 text-blue-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">
        {t('login.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('login.profile')}
          </label>
          <input
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('login.profilePlaceholder')}
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('login.submit')}
        </button>
      </form>
    </div>
  );
};