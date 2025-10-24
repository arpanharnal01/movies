import { Link, useNavigate } from 'react-router-dom';
import { Film, Search } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Film className="w-8 h-8 text-red-600 group-hover:text-red-500 transition-colors" />
            <span className="text-xl font-bold text-white">CineTrack</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/movies"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              TV Shows
            </Link>
            <Link
              to="/watchlist"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Watchlist
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 lg:w-64 px-4 py-2 pl-10 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>
        </div>

        <nav className="md:hidden flex items-center justify-around pb-3 space-x-4">
          <Link
            to="/movies"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            TV Shows
          </Link>
          <Link
            to="/watchlist"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
