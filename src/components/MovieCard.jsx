import { Heart, Play, Star } from 'lucide-react'
import { motion } from 'framer-motion'

function MovieCard({ movie, onSelect, onToggleFavorite, isFavorite = false }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="group relative w-[170px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.85)] sm:w-[190px]"
    >
      <button
        type="button"
        onClick={() => onSelect(movie)}
        className="relative w-full text-left"
      >
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="h-[250px] w-full object-cover sm:h-[280px]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent p-3 opacity-95 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="line-clamp-1 text-sm font-semibold tracking-wide text-zinc-100">
            {movie.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-zinc-300">
            {movie.genres[0]} • {movie.year}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-200">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </button>

      <div className="absolute right-2 top-2 flex items-center gap-2 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleFavorite(movie.id)
          }}
          className={`rounded-full border p-2 backdrop-blur-md ${
            isFavorite
              ? 'border-amber-400/80 bg-amber-500/90 text-black'
              : 'border-white/20 bg-black/60 text-zinc-100'
          }`}
          aria-label={isFavorite ? 'Remove from list' : 'Add to list'}
        >
          <Heart size={14} className={isFavorite ? 'fill-black text-black' : ''} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onSelect(movie)}
          className="rounded-full border border-white/20 bg-black/60 p-2 text-zinc-100 backdrop-blur-md"
          aria-label="Play trailer"
        >
          <Play size={14} className="fill-zinc-100 text-zinc-100" />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default MovieCard
