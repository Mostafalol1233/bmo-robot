import { useState, useEffect, useCallback } from 'react';
import finnIcon from '@assets/generated_images/Finn_character_icon_crop_db38cbd0.png';
import snakeBackground from '@assets/generated_images/Adventure_Time_snake_background_14eed4c5.png';
import defeatSound from '@assets/defeat_sound.mp3';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onBack: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

export default function SnakeGame({ onBack }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });
  const [isPaused, setIsPaused] = useState(false);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver || isPaused) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        // Play defeat sound
        const audio = new Audio(defeatSound);
        audio.volume = 0.3;
        audio.play().catch(() => {});
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        // Play defeat sound
        const audio = new Audio(defeatSound);
        audio.volume = 0.3;
        audio.play().catch(() => {});
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, food, gameStarted, gameOver, isPaused, generateFood]);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  // Start game
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setIsPaused(false);
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsPaused(false);
  };

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Mobile controls component
  const MobileControls = () => (
    <div className="mt-4 md:hidden">
      <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
        <div></div>
        <button 
          onClick={() => direction !== 'DOWN' && setDirection('UP')}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-2xl active:scale-95 transition-all"
          data-testid="snake-up"
        >
          ↑
        </button>
        <div></div>
        
        <button 
          onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-2xl active:scale-95 transition-all"
          data-testid="snake-left"
        >
          ←
        </button>
        <button 
          onClick={() => setIsPaused(prev => !prev)}
          disabled={!gameStarted || gameOver}
          className="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg border-2 border-yellow-700 flex items-center justify-center font-bold text-sm active:scale-95 transition-all disabled:opacity-50"
          data-testid="snake-pause"
        >
          {isPaused ? 'PLAY' : 'PAUSE'}
        </button>
        <button 
          onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-2xl active:scale-95 transition-all"
          data-testid="snake-right"
        >
          →
        </button>
        
        <div></div>
        <button 
          onClick={() => direction !== 'UP' && setDirection('DOWN')}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-2xl active:scale-95 transition-all"
          data-testid="snake-down"
        >
          ↓
        </button>
        <div></div>
      </div>
      
      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-white">Use arrows or tap buttons to move</p>
        <div className="flex justify-center space-x-4">
          {!gameStarted ? (
            <button 
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg border-2 border-green-700 transition-colors"
              data-testid="button-start-snake"
            >
              Start Game
            </button>
          ) : (
            <button 
              onClick={resetGame}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg border-2 border-red-700 transition-colors"
              data-testid="button-reset-snake"
            >
              Reset Game
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4 overflow-y-auto bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 192, 203, 0.7), rgba(255, 182, 193, 0.7)), url(${snakeBackground})`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-4 border-pink-700 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="text-pink-600 hover:text-pink-800 transition-colors"
              data-testid="button-back-from-snake"
            >
              ← Back to Games
            </button>
            <h1 className="text-2xl font-bold text-pink-800">🐍 Adventure Time Snake</h1>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-pink-800">Score: {score}</div>
            <div className="text-sm text-pink-600">High Score: {highScore}</div>
          </div>
        </div>

        {/* Game Status */}
        {!gameStarted && !gameOver && (
          <div className="bg-white border-4 border-pink-700 rounded-lg p-6 mb-4 text-center">
            <h2 className="text-xl font-bold text-pink-800 mb-4">🍭 Welcome to Candy Kingdom Snake!</h2>
            <p className="text-pink-700 mb-4">
              Help Finn collect candy while avoiding the walls and himself!
            </p>
            <div className="bg-pink-100 border-2 border-pink-300 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-pink-800 mb-2">How to Play:</h3>
              <div className="text-sm text-pink-700 space-y-1">
                <p>• Use Arrow Keys or WASD to move</p>
                <p>• Press Space to pause/unpause</p>
                <p>• Collect candy (🍭) to grow and gain points</p>
                <p>• Don't hit the walls or yourself!</p>
              </div>
            </div>
            <button 
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg border-2 border-green-700 transition-colors transform hover:scale-105"
              data-testid="button-start-snake"
            >
              🎮 Start Adventure!
            </button>
          </div>
        )}

        {gameOver && (
          <div className="bg-white border-4 border-red-700 rounded-lg p-6 mb-4 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-4">💔 Game Over!</h2>
            <img src={finnIcon} alt="Finn sad" className="w-16 h-16 mx-auto mb-4" />
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-4">
              <div className="text-lg font-bold text-red-800">Final Score: {score}</div>
              <div className="text-sm text-red-600">High Score: {highScore}</div>
              {score === highScore && score > 0 && (
                <div className="text-yellow-600 font-bold mt-2">🏆 NEW HIGH SCORE!</div>
              )}
            </div>
            <div className="space-x-4">
              <button 
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg border-2 border-green-700 transition-colors transform hover:scale-105"
                data-testid="button-play-again-snake"
              >
                🔄 Play Again
              </button>
              <button 
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg border-2 border-gray-700 transition-colors transform hover:scale-105"
                data-testid="button-main-menu-snake"
              >
                🏠 Main Menu
              </button>
            </div>
          </div>
        )}

        {isPaused && gameStarted && !gameOver && (
          <div className="bg-white border-4 border-yellow-700 rounded-lg p-4 mb-4 text-center">
            <h2 className="text-lg font-bold text-yellow-800">⏸️ Game Paused</h2>
            <p className="text-yellow-700">Press Space or tap Pause button to continue</p>
          </div>
        )}

        {/* Game Board */}
        <div className="bg-white border-4 border-pink-700 rounded-lg p-4 overflow-x-auto">
          <div className="inline-block mx-auto">
            <div 
              className="grid gap-px bg-pink-200 p-2 rounded-lg"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                width: `${GRID_SIZE * 24}px`,
                height: `${GRID_SIZE * 24}px`
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;
                
                return (
                  <div
                    key={index}
                    className={`w-6 h-6 flex items-center justify-center text-sm ${
                      isFood ? 'bg-red-400' : 
                      isSnake ? (isHead ? 'bg-green-600' : 'bg-green-400') : 
                      'bg-pink-50'
                    }`}
                    data-testid={`snake-cell-${x}-${y}`}
                  >
                    {isFood && '🍭'}
                    {isHead && (
                      <img 
                        src={finnIcon} 
                        alt="Finn head" 
                        className="w-5 h-5 object-contain animate-pulse"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <MobileControls />

        {/* Instructions for Desktop */}
        <div className="hidden md:block bg-white border-4 border-pink-700 rounded-lg p-4 mt-4">
          <div className="text-center">
            <h3 className="font-bold text-pink-800 mb-2">Desktop Controls:</h3>
            <div className="text-sm text-pink-700 flex justify-center space-x-6">
              <span>Arrow Keys: Move</span>
              <span>WASD: Move</span>
              <span>Space: Pause</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}