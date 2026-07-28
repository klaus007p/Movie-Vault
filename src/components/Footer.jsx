import { Film, Globe, Send, Share2 } from 'lucide-react'

function Footer() {
  return (
    <footer className="mx-auto mt-14 w-full max-w-350 border-t border-white/10 px-4 py-8 text-zinc-400 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-zinc-200">
          <div className="rounded-lg bg-amber-500 p-2 text-black">
            <Film size={14} />
          </div>
          <span className="text-sm font-semibold tracking-wide">MovieVault</span>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <a href="#" className="hover:text-zinc-100">
            Privacy
          </a>
          <a href="#" className="hover:text-zinc-100">
            Terms
          </a>
          <a href="#" className="hover:text-zinc-100">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 p-2 hover:bg-white/10"
            aria-label="GitHub"
          >
            <Globe size={15} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 p-2 hover:bg-white/10"
            aria-label="X"
          >
            <Send size={15} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 p-2 hover:bg-white/10"
            aria-label="Instagram"
          >
            <Share2 size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
