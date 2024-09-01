import { create } from 'zustand';


const useUserStore = create((set) => ({
    token: localStorage.getItem('token') || null,
    setToken: (newToken) => set((state) => {
        localStorage.setItem('token', newToken);
        return ({ token: newToken });
    }),
    cleanToken: () => set((state) => {
        localStorage.removeItem('token');
        return ({ token: null });
    }),
}));

export default useUserStore;