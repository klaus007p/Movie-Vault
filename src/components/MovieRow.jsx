import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import MovieCard from './MovieCard'

function MovieRow({ title, movies, onSelect, onToggleFavorite, favorites }) {
  const scrollRef = useRef(null)

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -380 : 380,
      behavior: 'smooth',
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide text-zinc-100 sm:text-xl">
          {title}
        </h2>
        <div className="hidden items-center gap-2 sm:flex">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={() => scrollByAmount('left')}
            className="rounded-full border border-white/15 bg-zinc-900/80 p-2 text-zinc-200 backdrop-blur"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={() => scrollByAmount('right')}
            className="rounded-full border border-white/15 bg-zinc-900/80 p-2 text-zinc-200 backdrop-blur"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <MovieCard
              movie={movie}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(movie.id)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieRow
