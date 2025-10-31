import { create } from "zustand";

const useAuthStore = create(set => ({
  user: null, // As informações decodificadas do token
  token: null, // O token JWT completo
  fcmToken: null,
  setAuthData: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
  setFcmToken: (fcmToken) => set({fcmToken})
}))

export default useAuthStore;