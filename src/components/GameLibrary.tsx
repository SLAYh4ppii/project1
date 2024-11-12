import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Settings } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  coverImage: string;
  isInstalled: boolean;
}

interface GameLibraryProps {
  games: Game[];
  onLaunchGame: (gameId: string) => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ games, onLaunchGame }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {games.map((game) => (
        <div
          key={game.id}
          className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
        >
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4">
            <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => onLaunchGame(game.id)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{game.isInstalled ? t('games.play') : t('games.install')}</span>
              </button>

              <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};