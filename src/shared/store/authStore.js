import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const AUTH_URL = 'http://localhost:3001/api'; // Mock backend

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isAuthenticated: false,
      successMessage: null,

      clearError: () => set({ error: null }),
      clearSuccess: () => set({ successMessage: null }),

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      login: async ({ emailOrUsername, password }) => {
        set({ loading: true, error: null });
        try {
          // Mock successful login for demo
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            id: 1,
            name: emailOrUsername.includes('@') ? emailOrUsername.split('@')[0] : emailOrUsername,
            email: emailOrUsername
          };
          const mockToken = 'mock-jwt-token-123';

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            loading: false,
          });
          return { success: true };
        } catch (err) {
          set({ error: 'Error al iniciar sesión', loading: false });
          return { success: false, error: 'Error al iniciar sesión' };
        }
      },

      register: async (formData) => {
        set({ loading: true, error: null, successMessage: null });
        try {
          // Mock successful register
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          set({
            loading: false,
            successMessage: 'Registro exitoso. Puedes iniciar sesión.',
          });
          return { success: true };
        } catch (err) {
          set({ error: 'Error al registrarse', loading: false });
          return { success: false, error: 'Error al registrarse' };
        }
      },
    }),
    { 
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
);

