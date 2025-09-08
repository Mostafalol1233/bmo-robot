import { useState, useEffect } from 'react';
import finnIcon from '@assets/generated_images/Finn_character_icon_crop_db38cbd0.png';
import jakeIcon from '@assets/generated_images/Jake_character_icon_crop_331d1026.png';
import defeatSound from '@assets/defeat_sound.mp3';

type Player = 'X' | 'O' | null;
type Difficulty = 'easy' | 'medium' | 'hard';
type GameMode = '2-player' | 'vs-bot';

interface TicTacToeGameProps {
  onBack: () => void;
}

export default function TicTacToeGame({ onBack }: TicTacToeGameProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('2-player');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });

  // Win conditions
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  // Check for winner
  useEffect(() => {
    const checkWinner = () => {
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          setScore(prev => ({ ...prev, [board[a]!]: prev[board[a]!] + 1 }));
          
          // Play defeat sound if player (X) loses against bot
          if (gameMode === 'vs-bot' && board[a] === 'O') {
            const audio = new Audio(defeatSound);
            audio.volume = 0.5;
            audio.play().catch(() => {
              // Handle audio play failure silently
            });
          }
          return;
        }
      }
      
      if (board.every(cell => cell !== null)) {
        setWinner('tie');
        setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
      }
    };

    checkWinner();
  }, [board, gameMode]);

  // Bot move logic
  const getBotMove = (board: Player[], difficulty: Difficulty): number => {
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[];
    
    if (emptyCells.length === 0) return -1;

    // Hard difficulty - use minimax algorithm
    if (difficulty === 'hard') {
      return getBestMove(board);
    }
    
    // Medium difficulty - sometimes make strategic moves, sometimes random
    if (difficulty === 'medium') {
      if (Math.random() > 0.3) {
        // Try to win first
        for (const cell of emptyCells) {
          const testBoard = [...board];
          testBoard[cell] = 'O';
          if (checkWin(testBoard, 'O')) return cell;
        }
        
        // Try to block player from winning
        for (const cell of emptyCells) {
          const testBoard = [...board];
          testBoard[cell] = 'X';
          if (checkWin(testBoard, 'X')) return cell;
        }
      }
    }
    
    // Easy difficulty or fallback - random move
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  // Minimax algorithm for hard difficulty
  const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
    if (checkWin(board, 'O')) return 1;
    if (checkWin(board, 'X')) return -1;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board: Player[]): number => {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const checkWin = (board: Player[], player: Player): boolean => {
    return winConditions.some(condition => 
      condition.every(index => board[index] === player)
    );
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isGameStarted) return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    if (gameMode === '2-player') {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    } else if (currentPlayer === 'X') {
      setCurrentPlayer('O');
      
      // Bot move after a delay
      setTimeout(() => {
        const botMove = getBotMove(newBoard, difficulty);
        if (botMove !== -1) {
          const botBoard = [...newBoard];
          botBoard[botMove] = 'O';
          setBoard(botBoard);
          setCurrentPlayer('X');
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const startNewGame = () => {
    resetGame();
    setIsGameStarted(true);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0, ties: 0 });
    resetGame();
  };

  const renderCell = (index: number) => {
    const cellValue = board[index];
    
    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className="w-20 h-20 bg-cyan-100 border-4 border-cyan-600 rounded-lg flex items-center justify-center hover:bg-cyan-200 transition-colors disabled:opacity-50"
        disabled={!!cellValue || !!winner || !isGameStarted}
        data-testid={`tic-tac-toe-cell-${index}`}
      >
        {cellValue && (
          <img 
            src={cellValue === 'X' ? finnIcon : jakeIcon}
            alt={cellValue === 'X' ? 'Finn (X)' : 'Jake (O)'}
            className="w-12 h-12 object-contain"
          />
        )}
      </button>
    );
  };

  if (!isGameStarted) {
    return (
      <div className="p-6 bg-gradient-to-br from-cyan-400 to-cyan-500 min-h-full">
        <div className="bg-white border-4 border-cyan-700 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-cyan-800">🎮 Tic Tac Toe</h2>
            <button 
              onClick={onBack}
              className="text-cyan-600 hover:text-cyan-800"
              data-testid="button-back-from-tictactoe"
            >
              ← Back
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="text-center">
                <img src={finnIcon} alt="Finn" className="w-16 h-16 mx-auto mb-2" />
                <span className="text-sm text-cyan-700 font-medium">Finn (X)</span>
              </div>
              <span className="text-2xl">VS</span>
              <div className="text-center">
                <img src={jakeIcon} alt="Jake" className="w-16 h-16 mx-auto mb-2" />
                <span className="text-sm text-cyan-700 font-medium">Jake (O)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-700 mb-2">Game Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGameMode('2-player')}
                  className={`p-3 rounded border-2 text-sm font-medium transition-colors ${
                    gameMode === '2-player' 
                      ? 'bg-cyan-500 text-white border-cyan-600' 
                      : 'bg-white text-cyan-700 border-cyan-300 hover:border-cyan-500'
                  }`}
                  data-testid="button-2player-mode"
                >
                  2 Players
                </button>
                <button
                  onClick={() => setGameMode('vs-bot')}
                  className={`p-3 rounded border-2 text-sm font-medium transition-colors ${
                    gameMode === 'vs-bot' 
                      ? 'bg-cyan-500 text-white border-cyan-600' 
                      : 'bg-white text-cyan-700 border-cyan-300 hover:border-cyan-500'
                  }`}
                  data-testid="button-vs-bot-mode"
                >
                  VS Bot
                </button>
              </div>
            </div>

            {gameMode === 'vs-bot' && (
              <div>
                <label className="block text-sm font-medium text-cyan-700 mb-2">Difficulty</label>
                <div className="grid grid-cols-3 gap-2">
                  {['easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff as Difficulty)}
                      className={`p-2 rounded border-2 text-sm font-medium capitalize transition-colors ${
                        difficulty === diff 
                          ? 'bg-cyan-500 text-white border-cyan-600' 
                          : 'bg-white text-cyan-700 border-cyan-300 hover:border-cyan-500'
                      }`}
                      data-testid={`button-difficulty-${diff}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={startNewGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg border-2 border-green-700 transition-colors"
              data-testid="button-start-game"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-cyan-400 to-cyan-500 min-h-screen overflow-y-auto">
      <div className="max-w-md mx-auto pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">🎮 Tic Tac Toe</h2>
          <button 
            onClick={() => setIsGameStarted(false)}
            className="text-white hover:text-cyan-200"
            data-testid="button-back-to-menu"
          >
            ← Menu
          </button>
        </div>

        {/* Score Display */}
        <div className="bg-white border-4 border-cyan-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <div className="text-center">
              <img src={finnIcon} alt="Finn" className="w-8 h-8 mx-auto mb-1" />
              <div className="font-bold text-cyan-800">{score.X}</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-600 font-medium">Ties</div>
              <div className="font-bold text-cyan-800">{score.ties}</div>
            </div>
            <div className="text-center">
              <img src={jakeIcon} alt="Jake" className="w-8 h-8 mx-auto mb-1" />
              <div className="font-bold text-cyan-800">{score.O}</div>
            </div>
          </div>
        </div>

        {/* Game Status */}
        <div className="bg-white border-4 border-cyan-700 rounded-lg p-4 mb-6 text-center">
          {winner ? (
            <div className="space-y-2">
              {winner === 'tie' ? (
                <div className="text-lg font-bold text-cyan-800">It's a Tie! 🤝</div>
              ) : (
                <div className="space-y-2">
                  <div className="text-lg font-bold text-cyan-800">
                    {winner === 'X' ? 'Finn' : 'Jake'} Wins! 🎉
                  </div>
                  <img 
                    src={winner === 'X' ? finnIcon : jakeIcon}
                    alt={winner === 'X' ? 'Finn' : 'Jake'}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <img 
                src={currentPlayer === 'X' ? finnIcon : jakeIcon}
                alt={currentPlayer === 'X' ? 'Finn' : 'Jake'}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-cyan-800">
                {currentPlayer === 'X' ? 'Finn\'s' : 'Jake\'s'} Turn
              </span>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="bg-white border-4 border-cyan-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-3 gap-2">
            {board.map((_, index) => renderCell(index))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg border-2 border-blue-700 transition-colors"
            data-testid="button-reset-game"
          >
            Reset Game
          </button>
          <button
            onClick={resetScore}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg border-2 border-red-700 transition-colors"
            data-testid="button-reset-score"
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}