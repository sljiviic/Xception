import { create } from 'zustand'

export const useUiStore = create((set) => ({
  authModal: {
    isOpen: false,
    defaultView: 'login',
    redirectPath: null,
  },

  toggleDefaultView: () => set(state => ({
    authModal: {
      ...state.authModal,
      defaultView: state.authModal.defaultView === 'login' ? 'register' : 'login'
    }
  })),

  openAuthModal: (options = {}) => set({
    authModal: {
      isOpen: true,
      defaultView: options.defaultView || 'login',
      redirectPath: options.redirectPath || null,
    }
  }),

  closeAuthModal: () => set(state => ({
    authModal: {
      ...state.authModal,
      isOpen: false,
    }
  })),
}))