import useWatchlist from '../hooks/useWatchlist';
import MediaCard from '../components/MediaCard';
import { Bookmark } from 'lucide-react';

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Bookmark className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-gray-500">
              Start adding movies and TV shows to keep track of what you want to watch
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((item) => (
              <MediaCard
                key={`${item.id}-${item.media_type}`}
                item={item}
                mediaType={item.media_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
