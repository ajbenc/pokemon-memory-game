import { motion } from 'framer-motion';
import { Card as CardType } from '../types/types';
import { useEffect, useState } from 'react';
import '../styles/Card.css';

interface CardProps {
  card: CardType;
  onClick: () => void;
  isDisabled: boolean;
}

const neonColors = [
  'neon-red',
  'neon-blue',
  'neon-green',
  'neon-yellow',
  'neon-purple'
];

export const Card = ({ card, onClick, isDisabled }: CardProps) => {
  const [colorClass, setColorClass] = useState('');

  useEffect(() => {
    // Generate random color class on mount
    const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    setColorClass(randomColor);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-container"
    >
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`card-button ${isDisabled ? 'disabled' : ''}`}
      >
        <div className="card-inner">
          {/* Front Side */}
          <div className={`card-front ${colorClass}`}>
            <div className="card-content">
              <motion.img
                src={card.sprite}
                alt={card.name}
                className="card-image"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="card-name">{card.name}</h3>
            </div>
          </div>

 
        </div>
      </button>
    </motion.div>
  );
};