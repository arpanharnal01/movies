import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTVShowDetails, getImageUrl } from '../services/tmdbApi';
import useWatchlist from '../hooks/useWatchlist';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ToastNotification from '../components/ToastNotification';
import { Star, Calendar, Tv, Plus, Check } from 'lucide-react';

const TvShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = tvShow ? isInWatchlist(tvShow.id, 'tv') : false;

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        setLoading(true);
        const data = await getTVShowDetails(id);
        setTvShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShow();
  }, [id]);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(tvShow.id, 'tv');
      setToastMessage('Removed from watchlist');
    } else {
      addToWatchlist({ ...tvShow, media_type: 'tv', name: tvShow.name });
      setToastMessage('Added to watchlist');
    }
    setShowToast(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!tvShow) return <ErrorMessage message="TV show not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(tvShow.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <img
              src={getImageUrl(tvShow.poster_path, 'w500')}
              alt={tvShow.name}
              className="w-64 rounded-lg shadow-2xl"
            />

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {tvShow.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
                {tvShow.vote_average > 0 && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-white font-semibold">{tvShow.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                )}

                {tvShow.first_air_date && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(tvShow.first_air_date).getFullYear()}</span>
                  </div>
                )}

                {tvShow.number_of_seasons && (
                  <div className="flex items-center space-x-2">
                    <Tv className="w-5 h-5" />
                    <span>
                      {tvShow.number_of_seasons} Season{tvShow.number_of_seasons > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {tvShow.genres && tvShow.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tvShow.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full text-red-400 text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-300 text-lg mb-6 max-w-3xl leading-relaxed">
                {tvShow.overview}
              </p>

              <button
                onClick={handleWatchlistToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  inWatchlist
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TvShowDetail;
