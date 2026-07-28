import { motion } from 'framer-motion'
import MovieRow from '../components/MovieRow'
import MovieCard from '../components/MovieCard'

function MoviesPage({ movies, onSelectMovie, onToggleFavorite, favorites }) {
  const topPicks = movies.filter((movie) => movie.rating >= 8.4)
  const recent = movies.filter((movie) => movie.year >= 2024)

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Discover</p>
        <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">Movies</h1>
        <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
          Explore handpicked films across action, sci-fi, mystery, and more.
        </p>
      </header>

      <MovieRow
        title="Top Movie Picks"
        movies={topPicks}
        onSelect={onSelectMovie}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />

      <MovieRow
        title="Latest Arrivals"
        movies={recent}
        onSelect={onSelectMovie}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">All Movies</h2>
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default MoviesPage
