import { defineStore } from 'pinia'
import type { GameInfo, HistoryRecord } from '@/types/game'

interface GameState {
  currentGame: GameInfo | null
  historyList: HistoryRecord[]
  loading: boolean
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    currentGame: null,
    historyList: [],
    loading: false
  }),

  getters: {
    getCurrentPeriod: (state) => state.currentGame?.period || '',
    getCountdown: (state) => state.currentGame?.countdown || 0
  },

  actions: {
    setCurrentGame(game: GameInfo) {
      this.currentGame = game
    },

    updateCountdown(seconds: number) {
      if (this.currentGame) {
        this.currentGame.countdown = seconds
      }
    },

    setHistoryList(list: HistoryRecord[]) {
      this.historyList = list
    },

    setLoading(loading: boolean) {
      this.loading = loading
    }
  }
})
