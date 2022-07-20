import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),

  actions: {
    setLocalStorageToken(token: string) {
      localStorage.setItem('_admin-playground_token', token)
    },

    clearLocaleStorage() {
      localStorage.clear()
    },
  },
})
