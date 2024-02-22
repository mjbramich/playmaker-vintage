import { useEffect, useState } from 'react';

const useMounted = () => {
	const [mounted, setMounted] = useState(false);

	// runs on inital mount of component
	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return { mounted };
};

export default useMounted;
