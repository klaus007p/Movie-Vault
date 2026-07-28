import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import FilterBar from '../components/FilterBar'
import MovieCard from '../components/MovieCard'

const defaultFilters = {
  genre: 'All',
  year: 'All',
  rating: 'All',
}

const getRatingThreshold = (value) => {
  if (value === '9+') return 9
  if (value === '8+') return 8
  if (value === '7+') return 7

  return 0
}

function SearchPage({
  movies,
  genres,
  years,
  ratingFilters,
  onSelectMovie,
  onToggleFavorite,
  favorites,
}) {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(defaultFilters)

  const query = (searchParams.get('q') || '').trim().toLowerCase()

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesQuery =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)

      const matchesGenre =
        filters.genre === 'All' || movie.genres.includes(filters.genre)

      const matchesYear =
        filters.year === 'All' || String(movie.year) === filters.year

      const threshold = getRatingThreshold(filters.rating)
      const matchesRating = threshold === 0 || movie.rating >= threshold

      return matchesQuery && matchesGenre && matchesYear && matchesRating
    })
  }, [movies, query, filters])

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Explore Catalog</p>
        <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">Search & Filter</h1>
        <p className="text-sm text-zinc-400 sm:text-base">
          {query
            ? `Showing results for "${searchParams.get('q')}"`
            : 'Browse all titles and refine by genre, year, and rating.'}
        </p>
      </header>

      <FilterBar
        genres={genres}
        years={years}
        ratings={ratingFilters}
        selected={filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        onReset={() => setFilters(defaultFilters)}
      />

      {filteredMovies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex min-h-55 flex-col items-center justify-center gap-2 rounded-3xl border border-white/10"
        >
          <Search size={22} className="text-zinc-500" />
          <h2 className="text-lg font-semibold text-zinc-200">No matches found</h2>
          <p className="text-sm text-zinc-400">Try changing your filters or using a different keyword.</p>
        </motion.div>
      ) : (
        <>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-100">{filteredMovies.length}</span> titles
          </p>
          <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <AnimatePresence>
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.22 }}
                >
                  <MovieCard
                    movie={movie}
                    onSelect={onSelectMovie}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.includes(movie.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default SearchPage
