import { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.id === item.id && w.media_type === item.media_type);
      if (!exists) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (id, mediaType) => {
    setWatchlist((prev) => prev.filter((item) => !(item.id === id && item.media_type === mediaType)));
  };

  const isInWatchlist = (id, mediaType) => {
    return watchlist.some((item) => item.id === id && item.media_type === mediaType);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
