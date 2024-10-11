import { Injectable, untracked } from '@angular/core'
import { GameBoard, GameState, Player, PlayerSymbol } from '../types/game.types'
import { INITIAL_GAME_BOARD, PLAYERS } from '../helper/game.constants'
import { WINNING_COMBINATIONS } from '../helper/winning-combinations.constants'
import { signalSlice } from 'ngxtension/signal-slice'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private initialState: GameState = {
    turns: [],
    players: { ...structuredClone(PLAYERS) },
  }

  // @ts-ignore
  state = signalSlice({
    initialState: this.initialState,
    selectors: (state) => ({
      activePlayer: () => {
        if (
          state().turns.length > 0 &&
          state().turns[0].player.symbol === 'X'
        ) {
          return state().players['O']
        }

        return state().players['X']
      },
      gameBoard: () => {
        let gameBoard: GameBoard = <GameBoard>[
          ...INITIAL_GAME_BOARD.map((array) => [...array]),
        ]

        for (const turn of state.turns()) {
          const { square, player } = turn
          const { row, col } = square

          gameBoard[row][col] = player.symbol
        }

        return gameBoard
      },
      winner: () => {
        let winner: Player | null = null
        // @ts-ignore
        const gameBoard = state.gameBoard()

        for (const combination of WINNING_COMBINATIONS) {
          const firstSquareSymbol: PlayerSymbol | null =
            gameBoard[combination[0].row][combination[0].column]
          const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column]
          const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column]

          if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
          ) {
            const players = state().players
            winner = players[firstSquareSymbol]
          }
        }

        return winner
      },
      hasDraw: () => {
        // @ts-ignore
        return state.turns().length === 9 && untracked(() => !state.winner())
      },
    }),
    actionSources: {
      restart: (state, $: Observable<void>) => {
        return $.pipe(map(() => ({ ...state(), turns: [] })))
      },
      selectSquare: (
        state,
        $action: Observable<{ rowIndex: number; colIndex: number }>,
      ) =>
        $action.pipe(
          map(({ rowIndex, colIndex }) => {
            // @ts-ignore
            const currentPlayer = state.activePlayer()
            const prevTurns = state().turns

            const turns = [
              {
                square: { row: rowIndex, col: colIndex },
                player: currentPlayer,
              },
              ...prevTurns,
            ]

            return { ...state(), turns }
          }),
        ),
      changePlayerName: (
        state,
        $action: Observable<{ symbol: PlayerSymbol; newName: string }>,
      ) =>
        $action.pipe(
          map(({ symbol, newName }) => {
            const players = state().players
            const updatedPlayers = structuredClone(players)
            return {
              ...state(),
              players: {
                ...updatedPlayers,
                [symbol]: { ...players[symbol], name: newName },
              },
            }
          }),
        ),
    },
  })
}
