import { create } from 'zustand';

interface State {
	isOpen: boolean;
}

interface Actions {
	toggleMenu: () => void;
	closeMenu: () => void;
}

const useMobileMenuStore = create<State & Actions>()((set) => ({
	isOpen: false, // default false
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	closeMenu: () => set({ isOpen: false })
}));

export default useMobileMenuStore;
