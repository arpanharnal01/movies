import { WatchlistProvider } from './context/WatchlistContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <WatchlistProvider>
      <AppRouter />
    </WatchlistProvider>
  );
}

export default App;
