import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Footer from './components/Footer'
import MovieModal from './components/MovieModal'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import {
  allGenres,
  allYears,
  featuredMovie,
  getMoviesByIds,
  movies,
  ratingFilters,
  rowConfigs,
} from './data/mockMovies'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MyListPage from './pages/MyListPage'
import SearchPage from './pages/SearchPage'
import TVShowsPage from './pages/TVShowsPage'
// import { login, logout} from './store/authSlice' 


function AppShell() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const rowData = useMemo(
    () =>
      rowConfigs.map((row) => ({
        ...row,
        movies: getMoviesByIds(row.movieIds),
      })),
    [],
  )

  const onlyMovies = useMemo(
    () => movies.filter((movie) => movie.type === 'movie'),
    [],
  )

  const onlyShows = useMemo(() => movies.filter((movie) => movie.type === 'tv'), [])

  const favoriteMovies = useMemo(
    () => movies.filter((movie) => favorites.includes(movie.id)),
    [favorites],
  )

  const handleToggleFavorite = (movieId) => {
    setFavorites((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId],
    )
  }

  const handleSearchSubmit = (rawQuery) => {
    const query = rawQuery.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_15%,rgba(245,158,11,0.16),transparent_34%),radial-gradient(circle_at_80%_2%,rgba(56,189,248,0.12),transparent_30%),linear-gradient(180deg,#090909,#050505)]" />

      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={`${location.pathname}${location.search}`}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage
                    featuredMovie={featuredMovie}
                    rowData={rowData}
                    onSelectMovie={setSelectedMovie}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/movies"
              element={
                <PageTransition>
                  <MoviesPage
                    movies={onlyMovies}
                    onSelectMovie={setSelectedMovie}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/tv-shows"
              element={
                <PageTransition>
                  <TVShowsPage
                    shows={onlyShows}
                    onSelectMovie={setSelectedMovie}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/my-list"
              element={
                <PageTransition>
                  <MyListPage
                    favorites={favorites}
                    favoriteMovies={favoriteMovies}
                    onSelectMovie={setSelectedMovie}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/search"
              element={
                <PageTransition>
                  <SearchPage
                    movies={movies}
                    genres={allGenres}
                    years={allYears}
                    ratingFilters={ratingFilters}
                    onSelectMovie={setSelectedMovie}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                  />
                </PageTransition>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>

      <MovieModal
        movie={selectedMovie}
        isOpen={Boolean(selectedMovie)}
        onClose={() => setSelectedMovie(null)}
        isFavorite={selectedMovie ? favorites.includes(selectedMovie.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
