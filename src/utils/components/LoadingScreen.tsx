import { motion } from 'framer-motion';
import '../../styles/LoadingScreen.css';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-screen"
    >
      {/* Pokeball Image with Spin Animation */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pokeball-image-container"
      >
        <img 
          src="/images/pokeball-closed.png" 
          alt="Loading Pokeball" 
          className="pokeball-image"
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="loading-text-container"
      >
        <span className="loading-text">
          Loading Pokémons
        </span>
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};