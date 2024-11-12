import React from 'react';
import { ArrowLeft, Play, Download, Star } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  coverImage: string;
  isInstalled: boolean;
  description: string;
  version: string;
}

interface GameDetailsProps {
  game: Game;
  onViewChange: (view: 'library' | 'patchNotes' | 'gameDetails') => void;
  onLaunchGame: (gameId: string) => void;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ game, onViewChange, onLaunchGame }) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <button
        onClick={() => onViewChange('library')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Library</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
            <p className="text-gray-200">Version {game.version}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => onLaunchGame(game.id)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200"
            >
              {game.isInstalled ? (
                <>
                  <Play className="w-5 h-5" />
                  <span>Play Now</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Install</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis 
              obsessed with power, glamour and body modification. You play as V, a mercenary outlaw 
              going after a one-of-a-kind implant that is the key to immortality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements</li>
              <li>Experience the intense combat system with a variety of weapons and hacks</li>
              <li>Explore the vast open world of Night City and its distinct districts</li>
              <li>Make choices that influence the story and shape your character's journey</li>
              <li>Customize your character's cyberware, skillset and playstyle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};