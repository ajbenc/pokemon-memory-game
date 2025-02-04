import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from './components/Card';
import { Card as CardType } from './types/types';
import { LoadingScreen } from './utils/components/LoadingScreen';
import { GameOverModal } from './utils/components/GameOverModal';
import './styles/App.css';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const TOTAL_CARDS = 12;
const POKEMON_LIMIT = 151;
const MIN_LOADING_TIME = 2000; // 2 seconds minimum loading time

const getRandomPokemonIds = (count: number): number[] => {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * POKEMON_LIMIT) + 1);
  }
  return Array.from(ids);
};

export default function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [clickedIds, setClickedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
//const [loadingStartTime] = useState(Date.now()); // Track when loading started

  // Fetch Pokémon data with minimum loading time
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const startTime = Date.now();
        const ids = getRandomPokemonIds(TOTAL_CARDS);
        const pokemonPromises = ids.map(id =>
          fetch(`${POKEAPI_URL}${id}`).then(res => res.json())
        );

        const pokemonData = await Promise.all(pokemonPromises);
        const formattedCards = pokemonData.map(p => ({
          id: p.id,
          name: p.name,
          sprite: p.sprites.other['official-artwork'].front_default,
        }));

        // Calculate remaining time to meet minimum loading duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

        setTimeout(() => {
          setCards(formattedCards);
          setIsLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [gameOver]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (clickedIds.includes(id)) {
      if (score > highScore) setHighScore(score);
      setIsVictory(false);
      setGameOver(true);
    } else {
      const newClicked = [...clickedIds, id];
      setClickedIds(newClicked);
      setScore(newClicked.length);
      shuffleCards();

      if (newClicked.length === TOTAL_CARDS) {
        setIsVictory(true);
        setGameOver(true);
        setHighScore(TOTAL_CARDS);
      }
    }
  };

  // Shuffle cards
  const shuffleCards = () => {
    setCards(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setClickedIds([]);
    setGameOver(false);
    setIsVictory(false);
    shuffleCards();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="background-effects">
        <div className="background-blur purple-blur" />
        <div className="background-blur blue-blur" />
      </div>

      <div className="app-content">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="app-header"
        >
          <h1 className="app-title">Pokémon Memory Challenge</h1>
          
          <div className="score-container">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="score-box"
            >
              <p className="score-text">Score: {score}</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="score-box"
            >
              <p className="score-text">High Score: {highScore}</p>
            </motion.div>
          </div>

          <p className="app-subtitle">
            "Gotta remember 'em all!"
          </p>
        </motion.header>

        <GameOverModal
          isOpen={gameOver}
          isVictory={isVictory}
          score={score}
          onRestart={resetGame}
        />

        <motion.div
          layout
          className="cards-grid"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                card={card}
                onClick={() => handleCardClick(card.id)}
                isDisabled={gameOver || isLoading}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}