export type GameTurn = {
  square: Square
  player: Player
}

export type Square = {
  row: number
  col: number
}

export type GameBoard = [
  [PlayerSymbol | null, PlayerSymbol | null, PlayerSymbol | null],
  [PlayerSymbol | null, PlayerSymbol | null, PlayerSymbol | null],
  [PlayerSymbol | null, PlayerSymbol | null, PlayerSymbol | null],
]

export type PlayerSymbol = 'X' | 'O'

export type Player = {
  symbol: PlayerSymbol
  name: string
}

export type PlayerRecord = {
  [K in PlayerSymbol]: { symbol: K; name: string }
}

export type GameState = {
  turns: GameTurn[]
  players: PlayerRecord
}
