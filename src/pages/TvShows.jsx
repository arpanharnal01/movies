import { useState, useEffect } from 'react';
import { getPopularTVShows } from '../services/tmdbApi';
import MediaCard from '../components/MediaCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Tv } from 'lucide-react';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const data = await getPopularTVShows();
        setTvShows(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Tv className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-white">Popular TV Shows</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvShows.map((show) => (
            <MediaCard key={show.id} item={show} mediaType="tv" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShows;
