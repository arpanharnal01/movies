import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMulti } from '../services/tmdbApi';
import MediaCard from '../components/MediaCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await searchMulti(query);
        const filtered = (data.results || []).filter(
          (item) => item.media_type === 'movie' || item.media_type === 'tv'
        );
        setResults(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <SearchIcon className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-white">
            Search Results for "{query}"
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">
              No results found
            </h2>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((item) => (
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

export default Search;
