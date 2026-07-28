import { motion } from 'framer-motion'
import { Info, Play } from 'lucide-react'

function HeroSection({ movie, onPlay, onMoreInfo }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)]">
      <img
        src={movie.backdrop}
        alt={`${movie.title} backdrop`}
        className="h-[380px] w-full object-cover sm:h-[450px] lg:h-[520px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/15" />

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:max-w-[62%] lg:p-10"
      >
        <span className="inline-flex rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs font-medium tracking-wide text-amber-300">
          Featured Premiere
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          {movie.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          {movie.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onPlay(movie)}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black"
          >
            <Play size={16} className="fill-black text-black" />
            Play
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onMoreInfo(movie)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-100 backdrop-blur-md"
          >
            <Info size={16} />
            More Info
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
