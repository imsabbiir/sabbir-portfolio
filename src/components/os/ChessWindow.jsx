"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Bot,
  User,
  Trophy,
  Swords,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

// Standard Unicode Chess Pieces
const PIECE_SYMBOLS = {
  w: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },
  b: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
};

const PIECE_VALUES = {
  p: 1,
  n: 3,
  b: 3.25,
  r: 5,
  q: 9,
  k: 100,
};

// Initial Board Setup
function createInitialBoard() {
  const b = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Black major pieces
  const blackRow = ["r", "n", "b", "q", "k", "b", "n", "r"];
  for (let c = 0; c < 8; c++) {
    b[0][c] = { color: "b", type: blackRow[c] };
    b[1][c] = { color: "b", type: "p" };
    b[6][c] = { color: "w", type: "p" };
    b[7][c] = { color: "w", type: blackRow[c] };
  }
  return b;
}

// Web Audio sound synthesizer for piece moves & captures
function playChessSound(type = "move") {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === "move") {
      // Crisp wooden click sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "capture") {
      // Deeper wood knock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "victory") {
      // Harmonic chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.4);
      });
    }
  } catch (e) {
    // Audio context may be blocked before gesture
  }
}

// Calculates legal moves for a piece on square (r, c)
function getPieceMoves(board, r, c) {
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];
  const { color, type } = piece;
  const opp = color === "w" ? "b" : "w";

  const isInBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

  if (type === "p") {
    const dir = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;

    // 1 square forward
    if (isInBounds(r + dir, c) && !board[r + dir][c]) {
      moves.push({ r: r + dir, c });
      // 2 squares from start
      if (r === startRow && isInBounds(r + dir * 2, c) && !board[r + dir * 2][c]) {
        moves.push({ r: r + dir * 2, c });
      }
    }
    // Diagonal captures
    [-1, 1].forEach((dc) => {
      const nr = r + dir;
      const nc = c + dc;
      if (isInBounds(nr, nc) && board[nr][nc] && board[nr][nc].color === opp) {
        moves.push({ r: nr, c: nc, capture: true });
      }
    });
  } else if (type === "n") {
    const deltas = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ];
    deltas.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (isInBounds(nr, nc)) {
        if (!board[nr][nc] || board[nr][nc].color === opp) {
          moves.push({ r: nr, c: nc, capture: !!board[nr][nc] });
        }
      }
    });
  } else if (type === "b" || type === "r" || type === "q") {
    const directions = [];
    if (type === "b" || type === "q") {
      directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
    }
    if (type === "r" || type === "q") {
      directions.push([-1, 0], [1, 0], [0, -1], [0, 1]);
    }

    directions.forEach(([dr, dc]) => {
      let nr = r + dr;
      let nc = c + dc;
      while (isInBounds(nr, nc)) {
        if (!board[nr][nc]) {
          moves.push({ r: nr, c: nc });
        } else {
          if (board[nr][nc].color === opp) {
            moves.push({ r: nr, c: nc, capture: true });
          }
          break;
        }
        nr += dr;
        nc += dc;
      }
    });
  } else if (type === "k") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (isInBounds(nr, nc)) {
          if (!board[nr][nc] || board[nr][nc].color === opp) {
            moves.push({ r: nr, c: nc, capture: !!board[nr][nc] });
          }
        }
      }
    }
  }

  return moves;
}

export default function ChessWindow() {
  const [board, setBoard] = useState(createInitialBoard);
  const [turn, setTurn] = useState("w"); // "w" | "b"
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null); // { from: {r, c}, to: {r, c} }
  const [capturedByWhite, setCapturedByWhite] = useState([]);
  const [capturedByBlack, setCapturedByBlack] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameMode, setGameMode] = useState("ai"); // "ai" | "pvp"
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState("in_progress"); // "in_progress" | "white_won" | "black_won" | "draw"

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // Helper to get all moves for a color
  const getAllMovesForColor = useCallback((b, color) => {
    const all = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (b[r][c] && b[r][c].color === color) {
          const moves = getPieceMoves(b, r, c);
          moves.forEach((m) => {
            all.push({ from: { r, c }, to: m });
          });
        }
      }
    }
    return all;
  }, []);

  // Execute a chess move
  const makeMove = useCallback(
    (fromR, fromC, toR, toC) => {
      setBoard((prev) => {
        const next = prev.map((row) => [...row]);
        const movingPiece = { ...next[fromR][fromC] };
        const targetPiece = next[toR][toC];

        // Track captured piece
        if (targetPiece) {
          if (targetPiece.color === "b") {
            setCapturedByWhite((c) => [...c, targetPiece.type]);
          } else {
            setCapturedByBlack((c) => [...c, targetPiece.type]);
          }
          if (soundEnabled) playChessSound("capture");
          if (targetPiece.type === "k") {
            setGameStatus(movingPiece.color === "w" ? "white_won" : "black_won");
            if (soundEnabled) playChessSound("victory");
          }
        } else {
          if (soundEnabled) playChessSound("move");
        }

        // Auto Queen promotion on 8th/1st rank
        if (movingPiece.type === "p") {
          if ((movingPiece.color === "w" && toR === 0) || (movingPiece.color === "b" && toR === 7)) {
            movingPiece.type = "q";
          }
        }

        next[toR][toC] = movingPiece;
        next[fromR][fromC] = null;

        // Algebraic notation
        const notation = `${movingPiece.type.toUpperCase()}${files[toC]}${8 - toR}${
          targetPiece ? "x" : ""
        }`;
        setMoveHistory((h) => [...h, notation]);
        setLastMove({ from: { r: fromR, c: fromC }, to: { r: toR, c: toC } });

        return next;
      });

      setSelectedSquare(null);
      setValidMoves([]);
      setTurn((t) => (t === "w" ? "b" : "w"));
    },
    [files, soundEnabled]
  );

  // AI Bot Turn logic
  useEffect(() => {
    if (gameMode === "ai" && turn === "b" && gameStatus === "in_progress") {
      setIsBotThinking(true);
      const timer = setTimeout(() => {
        const botMoves = getAllMovesForColor(board, "b");
        if (botMoves.length === 0) {
          setGameStatus("white_won");
          setIsBotThinking(false);
          return;
        }

        // Intelligent Scoring heuristic:
        // Prioritize capturing high value pieces, then central control
        botMoves.sort((a, bMove) => {
          const targetA = board[a.to.r][a.to.c];
          const targetB = board[bMove.to.r][bMove.to.c];

          const valA = targetA ? (PIECE_VALUES[targetA.type] || 0) * 10 : 0;
          const valB = targetB ? (PIECE_VALUES[targetB.type] || 0) * 10 : 0;

          // Center control bonus for d4, d5, e4, e5
          const centerA = (a.to.r === 3 || a.to.r === 4) && (a.to.c === 3 || a.to.c === 4) ? 2 : 0;
          const centerB = (bMove.to.r === 3 || bMove.to.r === 4) && (bMove.to.c === 3 || bMove.to.c === 4) ? 2 : 0;

          return valB + centerB - (valA + centerA) + (Math.random() - 0.5) * 1.5;
        });

        const bestMove = botMoves[0];
        makeMove(bestMove.from.r, bestMove.from.c, bestMove.to.r, bestMove.to.c);
        setIsBotThinking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [board, gameMode, turn, gameStatus, getAllMovesForColor, makeMove]);

  // Click handler for a square
  const handleSquareClick = (r, c) => {
    if (gameStatus !== "in_progress") return;
    if (gameMode === "ai" && turn === "b") return; // Waiting for bot

    const piece = board[r][c];

    // If a square is already selected
    if (selectedSquare) {
      const isMoveValid = validMoves.some((m) => m.r === r && m.c === c);

      if (isMoveValid) {
        makeMove(selectedSquare.r, selectedSquare.c, r, c);
        return;
      }

      // If clicking another piece of our color, select it instead
      if (piece && piece.color === turn) {
        setSelectedSquare({ r, c });
        setValidMoves(getPieceMoves(board, r, c));
        return;
      }

      // Deselect
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    // Select our piece
    if (piece && piece.color === turn) {
      setSelectedSquare({ r, c });
      setValidMoves(getPieceMoves(board, r, c));
    }
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setTurn("w");
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setMoveHistory([]);
    setGameStatus("in_progress");
  };

  return (
    <div className="text-slate-800 dark:text-slate-100 font-sans pb-4">
      {/* Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-black/10 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold text-lg">
            ♟
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>SabbirOS Grandmaster Chess</span>
              {gameStatus === "white_won" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  White Won! 🏆
                </span>
              )}
              {gameStatus === "black_won" && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-bold">
                  Black Won! 🏆
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                {turn === "w" ? "⚪ White's Turn" : isBotThinking ? "🤖 Bot is Thinking..." : "⚫ Black's Turn"}
              </span>
              <span>•</span>
              <span>Moves: {moveHistory.length}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Game Mode Switch */}
          <button
            type="button"
            onClick={() => setGameMode((m) => (m === "ai" ? "pvp" : "ai"))}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-medium transition cursor-pointer"
            title="Toggle Bot vs 2-Player"
          >
            {gameMode === "ai" ? (
              <>
                <Bot size={13} className="text-amber-500" />
                <span>vs Bot AI</span>
              </>
            ) : (
              <>
                <User size={13} className="text-sky-400" />
                <span>Pass & Play</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled((s) => !s)}
            className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            title={soundEnabled ? "Mute Chess Sounds" : "Unmute Chess Sounds"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Restart Button */}
          <button
            type="button"
            onClick={resetGame}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>New Game</span>
          </button>
        </div>
      </div>

      {/* Main Chess Arena */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 sm:gap-6 w-full">
        {/* Left: The 8x8 Board & Captured Pieces */}
        <div className="flex flex-col items-center w-full max-w-[360px] sm:max-w-[400px] shrink-0">
          {/* Black Captured Bar */}
          <div className="w-full flex items-center justify-between px-2.5 py-1 mb-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-white/20 inline-block" />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px] sm:text-xs">
                {gameMode === "ai" ? "Black (Bot AI)" : "Black (Player 2)"}
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-base font-serif min-h-[22px]">
              {capturedByWhite.map((p, i) => (
                <span key={i} className="text-stone-900 dark:text-stone-200">
                  {PIECE_SYMBOLS.b[p]}
                </span>
              ))}
            </div>
          </div>

          {/* The Board Frame */}
          <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-stone-700/60 dark:border-stone-800 shadow-xl bg-stone-900 select-none">
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
              {board.map((row, r) =>
                row.map((piece, c) => {
                  const isLight = (r + c) % 2 === 0;
                  const isSelected = selectedSquare && selectedSquare.r === r && selectedSquare.c === c;
                  const isValidTarget = validMoves.some((m) => m.r === r && m.c === c);
                  const isLastMove =
                    lastMove &&
                    ((lastMove.from.r === r && lastMove.from.c === c) ||
                      (lastMove.to.r === r && lastMove.to.c === c));

                  let squareBg = isLight ? "bg-[#f0d9b5]" : "bg-[#b58863]";
                  if (isSelected) {
                    squareBg = "bg-[#f7ec7d] ring-2 ring-inset ring-amber-500 z-10";
                  } else if (isLastMove) {
                    squareBg = isLight ? "bg-[#eed187]" : "bg-[#be974f]";
                  }

                  return (
                    <button
                      key={`${r}-${c}`}
                      type="button"
                      onClick={() => handleSquareClick(r, c)}
                      className={`relative flex items-center justify-center cursor-pointer transition-colors ${squareBg} aspect-square w-full h-full p-0`}
                    >
                      {/* Board coordinate labels */}
                      {c === 0 && (
                        <span
                          className={`absolute top-0.5 left-1 text-[8px] sm:text-[9px] font-mono font-bold pointer-events-none select-none ${
                            isLight ? "text-[#b58863]" : "text-[#f0d9b5]"
                          }`}
                        >
                          {8 - r}
                        </span>
                      )}
                      {r === 7 && (
                        <span
                          className={`absolute bottom-0.5 right-1 text-[8px] sm:text-[9px] font-mono font-bold pointer-events-none select-none ${
                            isLight ? "text-[#b58863]" : "text-[#f0d9b5]"
                          }`}
                        >
                          {files[c]}
                        </span>
                      )}

                      {/* Valid Move Indicator Dot / Ring */}
                      {isValidTarget && (
                        piece ? (
                          <div className="absolute inset-0 m-1 rounded-full border-2 sm:border-[3px] border-rose-500/90 pointer-events-none z-10 animate-pulse" />
                        ) : (
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-900/35 pointer-events-none z-10" />
                        )
                      )}

                      {/* Chess Piece Symbol - Standard uniform size, NO scale up or jump */}
                      {piece && (
                        <span
                          className={`text-2xl min-[360px]:text-3xl sm:text-4xl leading-none select-none pointer-events-none ${
                            piece.color === "w"
                              ? "text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]"
                              : "text-stone-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]"
                          }`}
                        >
                          {PIECE_SYMBOLS[piece.color][piece.type]}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* White Captured Bar */}
          <div className="w-full flex items-center justify-between px-2.5 py-1 mt-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-400 inline-block" />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px] sm:text-xs">
                White (You)
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-base font-serif min-h-[22px]">
              {capturedByBlack.map((p, i) => (
                <span key={i} className="text-stone-900 dark:text-stone-200">
                  {PIECE_SYMBOLS.w[p]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Move Notation & Instructions */}
        <div className="flex-1 w-full min-w-[220px] max-w-[340px] flex flex-col gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 shadow-xs flex flex-col">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Swords size={13} className="text-amber-500" />
                <span>Match Log & Notation</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                {moveHistory.length} moves
              </span>
            </h3>

            {/* Scrollable Move Log */}
            <div className="h-44 sm:h-52 overflow-y-auto space-y-1 text-xs font-mono pr-1 custom-scrollbar">
              {moveHistory.length === 0 ? (
                <div className="text-slate-400 italic text-[11px] pt-4 text-center">
                  Make your opening move (e.g. Pawn e4)...
                </div>
              ) : (
                Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[11px]"
                  >
                    <span className="text-slate-400 w-8">{idx + 1}.</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex-1">
                      {moveHistory[idx * 2]}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 flex-1 text-right">
                      {moveHistory[idx * 2 + 1] || ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Rules & Hotkeys */}
          <div className="p-3 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Trophy size={13} />
              <span>How to Play:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Click any piece of your color to see its valid moves. Capture the enemy King to declare checkmate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
