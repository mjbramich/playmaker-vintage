'use client';

import { useEffect, useState } from 'react';
import StoreModal from '@/components/modals/StoreModal';

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Only render modal if mounted, to avoid hydration errors
	return isMounted ? <StoreModal /> : null;
};

export default ModalProvider;
