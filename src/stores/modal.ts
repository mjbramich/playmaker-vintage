import { create } from 'zustand';

interface ModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

// Create store, which includes both state and (optionally) actions
const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	// set function merges state.
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}));

export default useModalStore;
