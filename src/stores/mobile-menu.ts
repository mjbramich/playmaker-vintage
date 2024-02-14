import { create } from 'zustand';

interface MobileMenuStore {
	isOpen: boolean;
	toggleMenu: () => void;
	closeMenu: () => void;
}

const useMobileMenuStore = create<MobileMenuStore>((set) => ({
	isOpen: false, // default false
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	closeMenu: () => set({ isOpen: false })
}));

export default useMobileMenuStore;
