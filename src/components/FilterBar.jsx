import { motion } from 'framer-motion'

function FilterGroup({ label, options, value, onSelect }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option

          return (
            <motion.button
              key={option}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'border-amber-400/70 bg-amber-500/30 text-amber-100'
                  : 'border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              {option}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function FilterBar({ genres, years, ratings, selected, onChange, onReset }) {
  return (
    <section className="glass rounded-2xl border border-white/10 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300">
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300 hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <FilterGroup
          label="Genre"
          options={genres}
          value={selected.genre}
          onSelect={(value) => onChange('genre', value)}
        />
        <FilterGroup
          label="Year"
          options={years}
          value={selected.year}
          onSelect={(value) => onChange('year', value)}
        />
        <FilterGroup
          label="Rating"
          options={ratings}
          value={selected.rating}
          onSelect={(value) => onChange('rating', value)}
        />
      </div>
    </section>
  )
}

export default FilterBar
