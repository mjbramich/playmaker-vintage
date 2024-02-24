import { useState, useEffect } from 'react';

// Custom hook to handle store/state hydration issues
// Runs only on initial mount and when the data in the store changes
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
const useStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F
) => {
	const result = store(callback) as F;

	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

export default useStore;
