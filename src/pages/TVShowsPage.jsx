import { motion } from 'framer-motion'
import MovieCard from '../components/MovieCard'
import MovieRow from '../components/MovieRow'

function TVShowsPage({ shows, onSelectMovie, onToggleFavorite, favorites }) {
  const highRated = shows.filter((show) => show.rating >= 8.5)

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Binge Worthy</p>
        <h1 className="text-3xl font-bold text-zinc-100 sm:text-4xl">TV Shows</h1>
        <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
          Dive into serialized stories with standout performances and cinematic visuals.
        </p>
      </header>

      <MovieRow
        title="Critics' Favorites"
        movies={highRated}
        onSelect={onSelectMovie}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">All TV Shows</h2>
        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              movie={show}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(show.id)}
            />
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default TVShowsPage
