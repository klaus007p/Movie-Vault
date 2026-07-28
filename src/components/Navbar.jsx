import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Film, House, Menu, Search, Tv, X, Bookmark } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Movies', to: '/movies', icon: Film },
  { label: 'TV Shows', to: '/tv-shows', icon: Tv },
  { label: 'My List', to: '/my-list', icon: Bookmark },
]

function DesktopLinks() {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-white/15 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-100'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

function Navbar({ searchQuery, onSearchChange, onSearchSubmit }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex w-full max-w-350 items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/65 px-3 py-2.5 backdrop-blur-lg sm:px-4">
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-amber-500 p-2 text-black shadow-[0_0_20px_rgba(245,158,11,0.45)]">
              <Film size={16} />
            </div>
            <span className="text-sm font-bold tracking-[0.2em] text-zinc-100 sm:text-base">
              MOVIEVAULT
            </span>
          </Link>
          <DesktopLinks />
        </div>

        <div className="flex items-center gap-2">
          <motion.form
            onSubmit={(event) => {
              event.preventDefault()
              onSearchSubmit(searchQuery)
            }}
            className="relative hidden items-center md:flex"
            animate={{ width: searchOpen ? 260 : 44 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          >
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              className="absolute left-2 rounded-full p-1 text-zinc-300"
              aria-label="Toggle search"
            >
              <Search size={16} />
            </button>
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search movies or shows"
              className="h-10 w-full rounded-full border border-white/15 bg-black/35 pl-9 pr-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
            />
          </motion.form>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-white/15 p-2 text-zinc-200 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/55"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 270, damping: 30 }}
              className="fixed right-0 top-0 z-40 h-full w-[82%] max-w-90 border-l border-white/10 bg-zinc-950/95 p-5 backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-[0.14em] text-zinc-100">
                  MENU
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/15 p-2 text-zinc-200"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  onSearchSubmit(searchQuery)
                  setMobileOpen(false)
                }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3">
                  <Search size={16} className="text-zinc-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search"
                    className="h-11 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                  />
                </div>
              </form>

              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index }}
                    >
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-amber-500 text-black'
                              : 'bg-white/5 text-zinc-200 hover:bg-white/10'
                          }`
                        }
                      >
                        <Icon size={16} />
                        {item.label}
                      </NavLink>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
