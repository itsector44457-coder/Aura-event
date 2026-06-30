import { create } from 'zustand';

interface AuthState {
    admin: any | null;
    setAdmin: (admin: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    admin: null,
    setAdmin: (admin) => set({ admin }),
    logout: () => set({ admin: null })
}));
