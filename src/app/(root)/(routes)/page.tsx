'use client';

import { useEffect } from 'react';

import useModalStore from '@/stores/modal';

export default function Home() {
	const onOpen = useModalStore((state) => state.onOpen);
	const isOpen = useModalStore((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return null;
}
