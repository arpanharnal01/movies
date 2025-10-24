import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getImageUrl } from '../services/tmdbApi';

const MediaCard = memo(({ item, mediaType }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const type = mediaType || item.media_type;
  const link = type === 'movie' ? `/movie/${item.id}` : `/tv-show/${item.id}`;

  return (
    <Link
      to={link}
      className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(item.poster_path)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">{year}</span>
            {item.vote_average > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-medium">{item.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 bg-gray-900">
        <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-400 text-xs">{year}</span>
          {item.vote_average > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-300 text-xs">{item.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

MediaCard.displayName = 'MediaCard';

export default MediaCard;
