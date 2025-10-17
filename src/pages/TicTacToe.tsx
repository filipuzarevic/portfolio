import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Player = "X" | "O" | null;
type Board = Player[];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Computer makes a move after player
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard: Board): { winner: Player | "Draw" | null; line: number[] } => {
    // Check for winning combinations
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: combination };
      }
    }

    // Check for draw
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: "Draw", line: [] };
    }

    return { winner: null, line: [] };
  };

  const minimax = (
    currentBoard: Board,
    depth: number,
    isMaximizing: boolean
  ): number => {
    const { winner } = checkWinner(currentBoard);

    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "Draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "O";
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "X";
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const makeComputerMove = () => {
    const newBoard = [...board];
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false);
        newBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    if (bestMove !== -1) {
      newBoard[bestMove] = "O";
      setBoard(newBoard);

      const { winner: gameWinner, line } = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        setWinningLine(line);
      } else {
        setIsPlayerTurn(true);
      }
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const { winner: gameWinner, line } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  const getStatusMessage = () => {
    if (winner === "X") return "You Won!";
    if (winner === "O") return "Computer Wins!";
    if (winner === "Draw") return "It's a Draw!";
    return isPlayerTurn ? "Your Turn (X)" : "Computer's Turn (O)";
  };

  const getCellClass = (index: number) => {
    let classes = "aspect-square flex items-center justify-center text-4xl md:text-6xl font-bold border-2 border-agency-navy cursor-pointer transition-all duration-200 hover:bg-agency-navy/5";

    if (board[index]) {
      classes += " cursor-not-allowed";
    }

    if (winningLine.includes(index)) {
      classes += " bg-green-100 border-green-500";
    }

    return classes;
  };

  return (
    <div className="min-h-screen bg-pattern">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-agency-navy hover:text-agency-navy/70 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-agency-navy mb-8 text-center">
            Tic-Tac-Toe
          </h1>

          {/* Game Container */}
          <Card className="p-6 md:p-8 max-w-lg mx-auto">
            {/* Status */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-agency-navy">
                {getStatusMessage()}
              </h2>
              {winner && (
                <p className="text-agency-gray mt-2">
                  {winner === "Draw"
                    ? "Good game! Try again?"
                    : winner === "X"
                    ? "Congratulations!"
                    : "Better luck next time!"}
                </p>
              )}
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 gap-2 mb-6 max-w-sm mx-auto">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  disabled={!!board[index] || !!winner || !isPlayerTurn}
                  className={getCellClass(index)}
                >
                  <span
                    className={
                      cell === "X"
                        ? "text-blue-600"
                        : cell === "O"
                        ? "text-red-600"
                        : ""
                    }
                  >
                    {cell}
                  </span>
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                onClick={resetGame}
                className="bg-agency-navy hover:bg-agency-navy/90 text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                New Game
              </Button>
            </div>
          </Card>

          {/* Game Info */}
          <div className="mt-8 text-center text-agency-gray">
            <p className="text-sm">
              You are <span className="font-semibold text-blue-600">X</span> and
              the computer is <span className="font-semibold text-red-600">O</span>
            </p>
            <p className="text-sm mt-1">
              The computer uses optimal strategy - good luck!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicTacToe;
