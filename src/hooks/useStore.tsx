import { useState, useEffect } from 'react';

// Custom hook to handle store/state hydration issues
// Runs only on initial mount and when the data in the store changes
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
const useStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F
) => {
	// Call the store function with the callback and store the result as type F
	const result = store(callback) as F;

	// Initialize state to store the result
	const [data, setData] = useState<F>();

	// Update the stored data when the result changes
	useEffect(() => {
		setData(result);
	}, [result]);

	// Return the stored data
	return data;
};

export default useStore;
