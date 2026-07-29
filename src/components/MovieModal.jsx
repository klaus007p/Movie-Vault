import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Play, Star, X } from 'lucide-react'

function MovieModal({
  movie,
  isOpen,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && movie ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-zinc-900/95"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/60 p-2 text-zinc-100"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[250px_1fr] md:gap-8">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="h-360px w-full rounded-2xl object-cover md:h-full"
              />

              <div>
                <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                  {movie.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {movie.rating.toFixed(1)}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-amber-400/35 bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {movie.description}
                </p>

                <div className="mt-5">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                    Cast
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">
                    {movie.cast.join(', ')}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black"
                  >
                    <Play size={16} className="fill-black text-black" />
                    Watch Trailer
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onToggleFavorite(movie.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${
                      isFavorite
                        ? 'border-amber-400/80 bg-amber-500 text-black'
                        : 'border-white/20 bg-white/10 text-zinc-100'
                    }`}
                  >
                    <Heart size={15} className={isFavorite ? 'fill-black text-black' : ''} />
                    {isFavorite ? 'In My List' : 'Add to My List'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default MovieModal
