import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Info, FileText } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  coverImage: string;
  isInstalled: boolean;
  description: string;
  version: string;
}

interface GameLibraryProps {
  games: Game[];
  onLaunchGame: (gameId: string) => void;
  onViewChange: (view: 'library' | 'patchNotes' | 'gameDetails') => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ games, onLaunchGame, onViewChange }) => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Patch Notes Button */}
        <div className="col-span-1">
          <button
            onClick={() => onViewChange('patchNotes')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FileText className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Patch Notes
            </h3>
          </button>
        </div>

        {/* Middle Column - Game Card */}
        <div className="col-span-1">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {game.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Version {game.version}
                </p>
                <button
                  onClick={() => onLaunchGame(game.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>{game.isInstalled ? t('games.play') : t('games.install')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Game Details Button */}
        <div className="col-span-1">
          <button
            onClick={() => onViewChange('gameDetails')}
            className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Info className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white">
              Game Details
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
};