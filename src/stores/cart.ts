import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { ProductWithImage as Product } from '@/types';

interface State {
	items: Product[];
}

interface Actions {
	addItem: (item: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
}

const useCartStore = create<State & Actions>()(
	// persist middle enables us to store state in a storage (eg: localStorage)
	persist(
		(set, get) => ({
			items: [],

			addItem: (item: Product) => {
				const existingItem = get().items.find((i) => i.id === item.id);

				// Prevent adding duplicate items to the cart
				if (existingItem) {
					toast('Item is already in cart');
					return;
				}

				set({ items: [...get().items, item] });
				toast.success('Item added to cart.');
			},

			removeItem: (id: string) => {
				set({ items: [...get().items.filter((item) => item.id !== id)] });
				toast.success('Item removed from cart.');
			},
			removeAll: () => set({ items: [] })
		}),
		{
			name: 'userCart',
			storage: createJSONStorage(() => localStorage)
		}
	)
);
export default useCartStore;
