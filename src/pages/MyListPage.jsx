import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import MovieCard from '../components/MovieCard'

function MyListPage({ favorites, favoriteMovies, onSelectMovie, onToggleFavorite }) {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Personal</p>
        <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">My List</h1>
        <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
          Keep everything you want to watch in one place.
        </p>
      </header>

      {favoriteMovies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex min-h-240px flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20"
        >
          <div className="rounded-full bg-white/10 p-3 text-zinc-200">
            <Bookmark size={22} />
          </div>
          <h2 className="text-lg font-semibold text-zinc-100">No saved titles yet</h2>
          <p className="text-sm text-zinc-400">Tap the heart icon on any card to add it here.</p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default MyListPage
