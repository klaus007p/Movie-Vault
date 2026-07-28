import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.99 },
}

function PageTransition({ children }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-350 px-4 pb-16 pt-24 sm:px-6 lg:px-8"
    >
      {children}
    </motion.main>
  )
}

export default PageTransition
