"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, User, Bot, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type Player = "black" | "white" | null
type GameMode = "ai" | "human"
type Board = Player[][]

const BOARD_SIZE = 15
const WINNING_LENGTH = 5

interface Position {
  row: number
  col: number
}

export default function GomokuGame() {
  const [board, setBoard] = useState<Board>(() =>
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null)),
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>("black")
  const [gameMode, setGameMode] = useState<GameMode>("ai")
  const [winner, setWinner] = useState<Player>(null)
  const [gameHistory, setGameHistory] = useState<Position[]>([])
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [showWinDialog, setShowWinDialog] = useState(false)

  // 检查是否获胜
  const checkWinner = useCallback((board: Board, row: number, col: number, player: Player): boolean => {
    if (!player) return false

    const directions = [
      [0, 1], // 水平
      [1, 0], // 垂直
      [1, 1], // 对角线
      [1, -1], // 反对角线
    ]

    for (const [dx, dy] of directions) {
      let count = 1

      // 向一个方向检查
      for (let i = 1; i < WINNING_LENGTH; i++) {
        const newRow = row + dx * i
        const newCol = col + dy * i
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }

      // 向相反方向检查
      for (let i = 1; i < WINNING_LENGTH; i++) {
        const newRow = row - dx * i
        const newCol = col - dy * i
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          board[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }

      if (count >= WINNING_LENGTH) {
        return true
      }
    }

    return false
  }, [])

  // 评估位置分数（用于AI）
  const evaluatePosition = useCallback((board: Board, row: number, col: number, player: Player): number => {
    if (!player || board[row][col] !== null) return -1000

    let score = 0
    const directions = [
      [0, 1], // 水平
      [1, 0], // 垂直
      [1, 1], // 对角线
      [1, -1], // 反对角线
    ]

    for (const [dx, dy] of directions) {
      let count = 1
      let openEnds = 0
      let blocked = 0

      // 向正方向检查
      let i = 1
      while (i < WINNING_LENGTH) {
        const newRow = row + dx * i
        const newCol = col + dy * i
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
          if (board[newRow][newCol] === player) {
            count++
          } else if (board[newRow][newCol] === null) {
            openEnds++
            break
          } else {
            blocked++
            break
          }
        } else {
          blocked++
          break
        }
        i++
      }

      // 向负方向检查
      i = 1
      while (i < WINNING_LENGTH) {
        const newRow = row - dx * i
        const newCol = col - dy * i
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
          if (board[newRow][newCol] === player) {
            count++
          } else if (board[newRow][newCol] === null) {
            openEnds++
            break
          } else {
            blocked++
            break
          }
        } else {
          blocked++
          break
        }
        i++
      }

      // 更精确的评分系统
      if (count >= 5) {
        score += 100000 // 获胜
      } else if (count === 4) {
        if (openEnds === 2)
          score += 10000 // 活四
        else if (openEnds === 1) score += 1000 // 冲四
      } else if (count === 3) {
        if (openEnds === 2)
          score += 1000 // 活三
        else if (openEnds === 1) score += 100 // 眠三
      } else if (count === 2) {
        if (openEnds === 2)
          score += 100 // 活二
        else if (openEnds === 1) score += 10 // 眠二
      }
    }

    return score
  }, [])

  // AI选择最佳位置
  const getAIMove = useCallback(
    (board: Board): Position => {
      const bestScore = -1
      const bestMove: Position = { row: 7, col: 7 }

      // 检查所有可能的位置
      const moves: { pos: Position; score: number }[] = []

      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (board[row][col] === null) {
            // 检查是否有邻近的棋子（优化搜索范围）
            let hasNeighbor = false
            for (let dr = -2; dr <= 2; dr++) {
              for (let dc = -2; dc <= 2; dc++) {
                const nr = row + dr
                const nc = col + dc
                if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc] !== null) {
                  hasNeighbor = true
                  break
                }
              }
              if (hasNeighbor) break
            }

            if (hasNeighbor || moves.length === 0) {
              // AI获胜检查
              const testBoard1 = board.map((r) => [...r])
              testBoard1[row][col] = "white"
              if (checkWinner(testBoard1, row, col, "white")) {
                return { row, col }
              }

              // 阻挡玩家获胜检查
              const testBoard2 = board.map((r) => [...r])
              testBoard2[row][col] = "black"
              if (checkWinner(testBoard2, row, col, "black")) {
                return { row, col }
              }

              // 评估位置价值
              const aiScore = evaluatePosition(board, row, col, "white")
              const playerScore = evaluatePosition(board, row, col, "black")
              const totalScore = aiScore + playerScore * 1.1 // 稍微偏重防守

              moves.push({ pos: { row, col }, score: totalScore })
            }
          }
        }
      }

      // 选择最佳位置
      moves.sort((a, b) => b.score - a.score)
      return moves.length > 0 ? moves[0].pos : bestMove
    },
    [checkWinner, evaluatePosition],
  )

  // 处理棋子放置
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (board[row][col] !== null || winner || isAiThinking) return

      const newBoard = board.map((r) => [...r])
      newBoard[row][col] = currentPlayer
      setBoard(newBoard)
      setGameHistory((prev) => [...prev, { row, col }])

      if (checkWinner(newBoard, row, col, currentPlayer)) {
        setWinner(currentPlayer)
        setShowWinDialog(true)
        return
      }

      const nextPlayer = currentPlayer === "black" ? "white" : "black"
      setCurrentPlayer(nextPlayer)

      // AI回合
      if (gameMode === "ai" && nextPlayer === "white") {
        setIsAiThinking(true)
        setTimeout(() => {
          const aiMove = getAIMove(newBoard)
          const aiBoard = newBoard.map((r) => [...r])
          aiBoard[aiMove.row][aiMove.col] = "white"
          setBoard(aiBoard)
          setGameHistory((prev) => [...prev, aiMove])

          if (checkWinner(aiBoard, aiMove.row, aiMove.col, "white")) {
            setWinner("white")
            setShowWinDialog(true)
          } else {
            setCurrentPlayer("black")
          }
          setIsAiThinking(false)
        }, 500)
      }
    },
    [board, currentPlayer, winner, isAiThinking, gameMode, checkWinner, getAIMove],
  )

  // 重新开始游戏
  const resetGame = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null)),
    )
    setCurrentPlayer("black")
    setWinner(null)
    setGameHistory([])
    setIsAiThinking(false)
    setShowWinDialog(false)
  }

  // 获取棋子样式
  const getPieceStyle = (piece: Player) => {
    if (piece === "black") {
      return "bg-gray-800 border-gray-900 shadow-lg"
    } else if (piece === "white") {
      return "bg-white border-gray-300 shadow-lg"
    }
    return ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* 游戏标题和控制 */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">五子棋</h1>

          {/* 游戏模式选择 */}
          <div className="flex justify-center gap-4 mb-4">
            <Button
              variant={gameMode === "ai" ? "default" : "outline"}
              onClick={() => {
                setGameMode("ai")
                resetGame()
              }}
              className="flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              人机对战
            </Button>
            <Button
              variant={gameMode === "human" ? "default" : "outline"}
              onClick={() => {
                setGameMode("human")
                resetGame()
              }}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              双人对战
            </Button>
          </div>

          {/* 游戏状态 */}
          <div className="flex justify-center items-center gap-4 mb-4">
            {winner ? (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {winner === "black" ? "黑子" : "白子"}获胜！
              </Badge>
            ) : isAiThinking ? (
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Bot className="w-4 h-4 mr-2" />
                AI思考中...
              </Badge>
            ) : (
              <Badge variant="outline" className="text-lg px-4 py-2">
                当前回合：{currentPlayer === "black" ? "黑子" : "白子"}
                {gameMode === "ai" && currentPlayer === "black" && <User className="w-4 h-4 ml-2" />}
                {gameMode === "ai" && currentPlayer === "white" && <Bot className="w-4 h-4 ml-2" />}
              </Badge>
            )}
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center gap-4">
            <Button onClick={resetGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              重新开始
            </Button>
          </div>
        </div>

        {/* 棋盘 */}
        <Card className="p-6 bg-amber-100 border-2 border-amber-200">
          <div className="relative">
            <div
              className="grid gap-0 bg-amber-200 p-2 rounded-lg"
              style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
                aspectRatio: "1",
              }}
            >
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="relative border border-amber-400 aspect-square flex items-center justify-center cursor-pointer hover:bg-amber-300 transition-colors"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {/* 星位标记 */}
                    {(rowIndex === 3 || rowIndex === 7 || rowIndex === 11) &&
                      (colIndex === 3 || colIndex === 7 || colIndex === 11) && (
                        <div className="absolute w-2 h-2 bg-amber-600 rounded-full" />
                      )}

                    {/* 棋子 */}
                    {cell && (
                      <div
                        className={`
                          w-[85%] h-[85%] rounded-full border-2 transition-all duration-200
                          ${getPieceStyle(cell)}
                        `}
                      />
                    )}
                  </div>
                )),
              )}
            </div>
          </div>
        </Card>

        {/* 游戏说明 */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>点击棋盘放置棋子，率先连成五子者获胜</p>
          <p className="font-semibold text-red-600">黑子先行，落子无悔</p>
        </div>

        {/* 获胜提示 */}
        {winner && (
          <Card className="mt-4 p-4 text-center bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <div className="mb-4">
              <div className="flex justify-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full border-2 ${winner === "black" ? "bg-gray-800 border-gray-900" : "bg-white border-gray-300"}`}
                />
              </div>
              <div className="text-lg font-bold text-green-600">{winner === "black" ? "黑子" : "白子"}获胜！</div>
              <div className="text-sm text-gray-600">
                恭喜
                {gameMode === "ai" && winner === "black"
                  ? "你"
                  : winner === "black"
                    ? "黑方"
                    : gameMode === "ai"
                      ? "AI"
                      : "白方"}
                获得胜利！
              </div>
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              再来一局
            </Button>
          </Card>
        )}

        {/* 获胜弹窗 */}
        <Dialog open={showWinDialog} onOpenChange={setShowWinDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                游戏结束
              </DialogTitle>
              <DialogDescription className="text-center">
                <div className="my-6">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-full border-4 shadow-lg ${winner === "black" ? "bg-gray-800 border-gray-900" : "bg-white border-gray-300"}`}
                    />
                  </div>
                  <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    {winner === "black" ? "黑子" : "白子"}获胜！
                  </div>
                  <div className="text-gray-600 mb-6 text-lg">
                    {gameMode === "ai" && winner === "black"
                      ? "恭喜你战胜了AI！"
                      : gameMode === "ai" && winner === "white"
                        ? "AI获得了胜利，再接再厉！"
                        : winner === "black"
                          ? "黑方获得胜利！"
                          : "白方获得胜利！"}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={resetGame}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      再来一局
                    </Button>
                    <Button variant="outline" onClick={() => setShowWinDialog(false)} className="flex-1 border-2">
                      继续观看
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
