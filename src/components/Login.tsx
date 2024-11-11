import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Key, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (credentials: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Key className="w-12 h-12 text-blue-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">
          {t('login.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('login.accessKeyId')}
            </label>
            <input
              type="text"
              value={credentials.accessKeyId}
              onChange={(e) => setCredentials({
                ...credentials,
                accessKeyId: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('login.secretKey')}
            </label>
            <input
              type="password"
              value={credentials.secretAccessKey}
              onChange={(e) => setCredentials({
                ...credentials,
                secretAccessKey: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('login.region')}
            </label>
            <select
              value={credentials.region}
              onChange={(e) => setCredentials({
                ...credentials,
                region: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="eu-central-1">EU (Frankfurt)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};