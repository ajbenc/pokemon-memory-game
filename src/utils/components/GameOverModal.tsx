import { motion } from 'framer-motion';
import '../../styles/GameOverModal.css';

interface GameOverModalProps {
  isOpen: boolean;
  isVictory: boolean;
  score: number;
  onRestart: () => void;
}

export const GameOverModal = ({
  isOpen,
  isVictory,
  score,
  onRestart,
}: GameOverModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game-over-modal"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className={`modal-content ${isVictory ? 'victory' : 'defeat'}`}
      >
        {/* Background Effects */}
        {isVictory && (
          <div className="sparkles-container">
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
          </div>
        )}

        <div className="modal-inner">
          <img
            src={isVictory ? "/images/pokeball-open.png" : "/images/pokeball-closed.png"}
            alt={isVictory ? "Victory" : "Defeat"}
            className="modal-image"
          />

          <h2 className="modal-title">
            {isVictory ? "Master Trainer!" : "Try Again!"}
          </h2>

          <div className="score-container">
            <p className="score-text">
              {isVictory ? "Perfect Score!" : `Score: ${score}`}
            </p>
            <p className="score-message">
              {isVictory ? "You caught them all!" : "Better luck next time!"}
            </p>
          </div>

          <button
            onClick={onRestart}
            className="restart-button"
          >
            <span className="button-text">
              {isVictory ? "Play Again" : "Retry"}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};