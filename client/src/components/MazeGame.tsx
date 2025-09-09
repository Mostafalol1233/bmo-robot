import { useState, useEffect, useCallback } from 'react';
import finnIcon from '@assets/generated_images/Finn_character_icon_crop_db38cbd0.png';
import mazeBackground from '@assets/generated_images/Adventure_Time_maze_background_25eebe19.png';

interface Position {
  x: number;
  y: number;
}

interface Enemy {
  id: number;
  position: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  lastMove: number;
}

interface PowerUp {
  id: number;
  position: Position;
  type: 'speed' | 'freeze' | 'key';
}

interface MazeGameProps {
  onBack: () => void;
}

// Maze templates - 0: wall, 1: path, 2: start, 3: end, 4: enemy spawn, 5: power-up spawn
const mazeTemplates = [
  // Level 1 - Simple with enemy
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 5, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 4, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 2
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 3
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 4
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 5
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 6
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 7
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 8
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 9
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  // Level 10 - Final Boss
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
];

export default function MazeGame({ onBack }: MazeGameProps) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 1, y: 1 });
  const [gameStarted, setGameStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [levelStartTime, setLevelStartTime] = useState(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [playerSpeed, setPlayerSpeed] = useState(1);
  const [enemiesFrozen, setEnemiesFrozen] = useState(false);
  const [keys, setKeys] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const currentMaze = mazeTemplates[currentLevel - 1];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !levelCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - levelStartTime);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, levelCompleted, levelStartTime]);

  // Find start position when level changes
  useEffect(() => {
    if (currentMaze) {
      for (let y = 0; y < currentMaze.length; y++) {
        for (let x = 0; x < currentMaze[y].length; x++) {
          if (currentMaze[y][x] === 2) {
            setPlayerPosition({ x, y });
            setLevelStartTime(Date.now());
            break;
          }
        }
      }
    }
  }, [currentLevel, currentMaze]);

  // Check if player reached end
  useEffect(() => {
    if (currentMaze && currentMaze[playerPosition.y][playerPosition.x] === 3) {
      setLevelCompleted(true);
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels(prev => [...prev, currentLevel]);
      }
      if (currentLevel === 10) {
        setIsCompleted(true);
      }
    }
  }, [playerPosition, currentMaze, currentLevel, completedLevels]);

  // Enemy AI movement
  useEffect(() => {
    if (!gameStarted || levelCompleted || enemiesFrozen) return;
    
    const moveEnemies = () => {
      setEnemies(prevEnemies => 
        prevEnemies.map(enemy => {
          const now = Date.now();
          if (now - enemy.lastMove < 1000) return enemy; // Move every second
          
          const directions = ['up', 'down', 'left', 'right'] as const;
          let newPosition = { ...enemy.position };
          let newDirection = enemy.direction;
          
          // Try to move in current direction
          switch (enemy.direction) {
            case 'up': newPosition.y = Math.max(0, enemy.position.y - 1); break;
            case 'down': newPosition.y = Math.min(currentMaze.length - 1, enemy.position.y + 1); break;
            case 'left': newPosition.x = Math.max(0, enemy.position.x - 1); break;
            case 'right': newPosition.x = Math.min(currentMaze[0].length - 1, enemy.position.x + 1); break;
          }
          
          // If hit wall or another enemy, change direction randomly
          if (currentMaze[newPosition.y][newPosition.x] === 1 ||
              prevEnemies.some(other => other.id !== enemy.id && 
                other.position.x === newPosition.x && other.position.y === newPosition.y)) {
            newDirection = directions[Math.floor(Math.random() * 4)];
            newPosition = enemy.position; // Don't move this turn
          }
          
          return {
            ...enemy,
            position: newPosition,
            direction: newDirection,
            lastMove: now
          };
        })
      );
    };
    
    const interval = setInterval(moveEnemies, 500);
    return () => clearInterval(interval);
  }, [gameStarted, levelCompleted, enemiesFrozen, currentMaze]);
  
  // Movement handler
  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameStarted || levelCompleted || gameOver) return;

    const newPosition = { ...playerPosition };
    
    switch (direction) {
      case 'up':
        newPosition.y = Math.max(0, playerPosition.y - 1);
        break;
      case 'down':
        newPosition.y = Math.min(currentMaze.length - 1, playerPosition.y + 1);
        break;
      case 'left':
        newPosition.x = Math.max(0, playerPosition.x - 1);
        break;
      case 'right':
        newPosition.x = Math.min(currentMaze[0].length - 1, playerPosition.x + 1);
        break;
    }

    // Check if new position is not a wall
    if (currentMaze[newPosition.y][newPosition.x] !== 1) {
      setPlayerPosition(newPosition);
    }
  }, [playerPosition, currentMaze, gameStarted, levelCompleted, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    if (gameStarted) {
      document.addEventListener('keydown', handleKeyPress);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [movePlayer, gameStarted]);

  const startLevel = (level: number) => {
    setCurrentLevel(level);
    setGameStarted(true);
    setLevelCompleted(false);
    setTimeElapsed(0);
    setLevelStartTime(Date.now());
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      startLevel(currentLevel + 1);
    }
  };

  const restartLevel = () => {
    startLevel(currentLevel);
  };

  const backToLevels = () => {
    setGameStarted(false);
    setLevelCompleted(false);
  };

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Mobile Joystick Component
  const MobileJoystick = () => (
    <div className="fixed bottom-8 right-8 grid grid-cols-3 gap-2 md:hidden">
      <div></div>
      <button 
        onClick={() => movePlayer('up')}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
        data-testid="joystick-up"
      >
        ↑
      </button>
      <div></div>
      
      <button 
        onClick={() => movePlayer('left')}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
        data-testid="joystick-left"
      >
        ←
      </button>
      <div></div>
      <button 
        onClick={() => movePlayer('right')}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
        data-testid="joystick-right"
      >
        →
      </button>
      
      <div></div>
      <button 
        onClick={() => movePlayer('down')}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border-2 border-blue-700 flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
        data-testid="joystick-down"
      >
        ↓
      </button>
      <div></div>
    </div>
  );

  // Level completed screen
  if (levelCompleted) {
    return (
      <div className="p-6 bg-gradient-to-br from-green-400 to-green-500 min-h-screen overflow-y-auto">
        <div className="max-w-md mx-auto pb-20">
          <div className="bg-white border-4 border-green-700 rounded-lg p-6 text-center">
            {isCompleted ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-800">🎉 Congratulations!</h2>
                <p className="text-green-700">You completed all 10 levels!</p>
                <img src={finnIcon} alt="Finn celebrating" className="w-16 h-16 mx-auto" />
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <div className="text-lg font-bold text-green-800">Final Time: {formatTime(timeElapsed)}</div>
                  <div className="text-sm text-green-600">Levels Completed: {completedLevels.length}/10</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-green-800">Level {currentLevel} Complete!</h2>
                <img src={finnIcon} alt="Finn" className="w-12 h-12 mx-auto" />
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-800">Time: {formatTime(timeElapsed)}</div>
                </div>
                {currentLevel < 10 && (
                  <button
                    onClick={nextLevel}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg border-2 border-blue-700 transition-colors"
                    data-testid="button-next-level"
                  >
                    Next Level →
                  </button>
                )}
              </div>
            )}
            
            <div className="flex space-x-2 mt-4">
              <button
                onClick={restartLevel}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-yellow-700 transition-colors"
                data-testid="button-restart-level"
              >
                Restart
              </button>
              <button
                onClick={backToLevels}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-gray-700 transition-colors"
                data-testid="button-back-levels"
              >
                Levels
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  if (gameStarted) {
    return (
      <div 
        className="p-4 min-h-screen overflow-y-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mazeBackground})`,
        }}
      >
        <div className="max-w-4xl mx-auto pb-20">
          {/* Game Header */}
          <div className="bg-white border-4 border-purple-700 rounded-lg p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={backToLevels}
                className="text-purple-600 hover:text-purple-800"
                data-testid="button-back-from-maze"
              >
                ← Levels
              </button>
              <h2 className="text-xl font-bold text-purple-800">🌟 Level {currentLevel}</h2>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-800">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-purple-600">Completed: {completedLevels.length}/10</div>
            </div>
          </div>

          {/* Maze */}
          <div className="bg-white border-4 border-purple-700 rounded-lg p-4 overflow-x-auto">
            <div className="inline-block mx-auto">
              <div 
                className="grid gap-1 bg-gray-800 p-2 rounded-lg"
                style={{ gridTemplateColumns: `repeat(${currentMaze[0].length}, 1fr)` }}
              >
                {currentMaze.flat().map((cell, index) => {
                  const x = index % currentMaze[0].length;
                  const y = Math.floor(index / currentMaze[0].length);
                  const isPlayer = playerPosition.x === x && playerPosition.y === y;
                  const enemy = enemies.find(e => e.position.x === x && e.position.y === y);
                  const powerUp = powerUps.find(p => p.position.x === x && p.position.y === y);
                  
                  return (
                    <div
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center rounded-sm relative ${
                        cell === 1 ? 'bg-gray-800' : // wall
                        cell === 3 ? 'bg-yellow-400 animate-pulse' : // exit
                        enemy && !enemiesFrozen ? 'bg-red-200' : // enemy path
                        powerUp ? 'bg-blue-200' : // power-up path
                        'bg-white' // normal path
                      }`}
                      data-testid={`maze-cell-${x}-${y}`}
                    >
                      {isPlayer && (
                        <img 
                          src={finnIcon} 
                          alt="Player" 
                          className={`w-6 h-6 object-contain ${playerSpeed > 1 ? 'animate-spin' : 'animate-bounce'}`}
                        />
                      )}
                      {enemy && !isPlayer && (
                        <span className={`text-red-600 font-bold text-lg ${enemiesFrozen ? 'animate-pulse text-blue-600' : 'animate-bounce'}`}>
                          👹
                        </span>
                      )}
                      {powerUp && !isPlayer && !enemy && (
                        <span className="text-blue-600 font-bold animate-pulse">
                          {powerUp.type === 'speed' ? '⚡' : powerUp.type === 'freeze' ? '❄️' : '🗝️'}
                        </span>
                      )}
                      {cell === 3 && !isPlayer && !enemy && !powerUp && (
                        <span className="text-orange-600 font-bold">🎯</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls Info */}
          <div className="bg-white border-4 border-purple-700 rounded-lg p-4 mt-4">
            <div className="text-center text-purple-800">
              <div className="font-bold mb-2">Controls</div>
              <div className="text-sm space-x-4">
                <span className="hidden md:inline">Arrow Keys / WASD to move</span>
                <span className="md:hidden">Use joystick to move</span>
                <span>🎯 Reach the target to complete!</span>
              </div>
            </div>
          </div>

          {/* Mobile Joystick */}
          <MobileJoystick />
        </div>
      </div>
    );
  }

  // Level selection screen
  return (
    <div className="p-6 bg-gradient-to-br from-purple-400 to-purple-500 min-h-screen overflow-y-auto">
      <div className="max-w-2xl mx-auto pb-20">
        <div className="bg-white border-4 border-purple-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-800">🌟 Maze Adventure</h2>
            <button 
              onClick={onBack}
              className="text-purple-600 hover:text-purple-800"
              data-testid="button-back-from-maze-menu"
            >
              ← Back
            </button>
          </div>

          <div className="text-center mb-6">
            <img src={finnIcon} alt="Finn" className="w-16 h-16 mx-auto mb-4" />
            <p className="text-purple-700 mb-2">Help Finn navigate through 10 challenging mazes!</p>
            <p className="text-sm text-purple-600">Use arrow keys or WASD on desktop, joystick on mobile</p>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(level => (
              <button
                key={level}
                onClick={() => startLevel(level)}
                className={`aspect-square p-4 rounded-lg border-2 font-bold text-lg transition-all hover:scale-105 ${
                  completedLevels.includes(level)
                    ? 'bg-green-500 text-white border-green-700 shadow-lg'
                    : 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200'
                }`}
                data-testid={`button-level-${level}`}
              >
                {level}
                {completedLevels.includes(level) && (
                  <div className="text-xs mt-1">✓</div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
            <div className="text-purple-800 font-medium">
              Progress: {completedLevels.length}/10 levels completed
            </div>
            {completedLevels.length === 10 && (
              <div className="text-green-600 font-bold mt-2">🎉 All levels completed! 🎉</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}