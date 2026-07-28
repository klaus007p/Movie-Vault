import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import MovieRow from '../components/MovieRow'

function HomePage({
  featuredMovie,
  rowData,
  onSelectMovie,
  onToggleFavorite,
  favorites,
}) {
  return (
    <div className="space-y-10">
      <HeroSection
        movie={featuredMovie}
        onPlay={onSelectMovie}
        onMoreInfo={onSelectMovie}
      />

      <motion.section
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-10"
      >
        {rowData.map((row) => (
          <motion.div
            key={row.id}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            <MovieRow
              title={row.title}
              movies={row.movies}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
            />
          </motion.div>
        ))}
      </motion.section>
    </div>
  )
}

export default HomePage
