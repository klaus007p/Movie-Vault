import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Film,
  House,
  Menu,
  Search,
  Tv,
  X,
  Bookmark,
  UserRound,
  LogOut,
  LoaderCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Movies', to: '/movies', icon: Film },
  { label: 'TV Shows', to: '/tv-shows', icon: Tv },
  { label: 'My List', to: '/my-list', icon: Bookmark },
]

const emptyForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const emptyErrors = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState(emptyErrors)
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userName, setUserName] = useState('Guest')
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const openAuthModal = (mode) => {
    setAuthMode(mode)
    setFormData(emptyForm)
    setErrors(emptyErrors)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    if (loading) {
      return
    }

    setAuthModalOpen(false)
    setErrors(emptyErrors)
    setFormData(emptyForm)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '' }))
  }

  const validateForm = () => {
    const nextErrors = { ...emptyErrors }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (authMode === 'signup') {
      if (!formData.name.trim()) {
        nextErrors.name = 'Name is required.'
      }

      if (!formData.confirmPassword) {
        nextErrors.confirmPassword = 'Please confirm your password.'
      } else if (formData.confirmPassword !== formData.password) {
        nextErrors.confirmPassword = 'Passwords do not match.'
      }
    }

    setErrors(nextErrors)

    return !nextErrors.name && !nextErrors.email && !nextErrors.password && !nextErrors.confirmPassword
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      setIsLoggedIn(true)
      setUserName(authMode === 'signup' ? formData.name.trim() : formData.email.split('@')[0])
      setAuthModalOpen(false)
      setFormData(emptyForm)
      setErrors(emptyErrors)
    }, 900)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setDropdownOpen(false)
    setUserName('Guest')
  }

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

          <div className="hidden items-center gap-2 sm:flex">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((previous) => !previous)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-100"
                  aria-label="Open account menu"
                >
                  <UserRound size={18} />
                </button>

                <AnimatePresence>
                  {dropdownOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-zinc-900/95 p-2 shadow-2xl"
                    >
                      <div className="mb-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="text-sm font-semibold text-zinc-100">{userName}</p>
                        <p className="text-xs text-zinc-400">Signed in</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-zinc-200 transition-colors hover:bg-white/10"
                      >
                        <UserRound size={15} />
                        Profile
                      </button>

                      <Link
                        to="/my-list"
                        onClick={() => setDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-zinc-200 transition-colors hover:bg-white/10"
                      >
                        <Bookmark size={15} />
                        My List
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-500/10"
                      >
                        <LogOut size={15} />
                        Log Out
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="rounded-full px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-zinc-100"
                >
                  Log In
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="rounded-full bg-amber-500 px-3 py-2 text-sm font-semibold text-black"
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>

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

              <div className="mb-6 space-y-2">
                {isLoggedIn ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                        <UserRound size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">{userName}</p>
                        <p className="text-xs text-zinc-400">Signed in</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        openAuthModal('login')
                      }}
                      className="flex w-full items-center justify-center rounded-full border border-white/15 px-3 py-2.5 text-sm font-medium text-zinc-100"
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        openAuthModal('signup')
                      }}
                      className="flex w-full items-center justify-center rounded-full bg-amber-500 px-3 py-2.5 text-sm font-semibold text-black"
                    >
                      Sign Up
                    </button>
                  </>
                )}
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

      <AnimatePresence>
        {authModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={closeAuthModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 18 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={closeAuthModal}
                className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-zinc-200"
                aria-label="Close authentication"
              >
                <X size={18} />
              </button>

              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">
                  {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
                  {authMode === 'login' ? 'Log in to your account' : 'Sign up for MovieVault'}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {authMode === 'login'
                    ? 'Continue watching your favorites with a smooth experience.'
                    : 'Create an account to save movies and keep your list synced.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' ? (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-200" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-2xl border border-white/15 bg-black/35 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                      placeholder="Enter your name"
                    />
                    {errors.name ? <p className="mt-1 text-sm text-red-400">{errors.name}</p> : null}
                  </div>
                ) : null}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-200" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 w-full rounded-2xl border border-white/15 bg-black/35 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                    placeholder="Enter your email"
                  />
                  {errors.email ? <p className="mt-1 text-sm text-red-400">{errors.email}</p> : null}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-200" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11 w-full rounded-2xl border border-white/15 bg-black/35 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                    placeholder="Enter your password"
                  />
                  {errors.password ? <p className="mt-1 text-sm text-red-400">{errors.password}</p> : null}
                </div>

                {authMode === 'signup' ? (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-200" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-2xl border border-white/15 bg-black/35 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                      placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword ? (
                      <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                    ) : null}
                  </div>
                ) : null}

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center rounded-2xl bg-amber-500 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle size={16} className="animate-spin" />
                      {authMode === 'login' ? 'Logging in...' : 'Creating account...'}
                    </span>
                  ) : authMode === 'login' ? (
                    'Log In'
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </form>

              <p className="mt-4 text-center text-sm text-zinc-400">
                {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login')
                    setErrors(emptyErrors)
                    setFormData(emptyForm)
                  }}
                  className="ml-1 font-medium text-amber-400"
                >
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
