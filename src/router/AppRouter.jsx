import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import TvShows from '../pages/TvShows';
import MovieDetail from '../pages/MovieDetail';
import TvShowDetail from '../pages/TvShowDetail';
import Watchlist from '../pages/Watchlist';
import Search from '../pages/Search';

const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv-show/:id" element={<TvShowDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
