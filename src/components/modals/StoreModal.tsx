'use-client';

import useModalStore from '@/stores/modal';
import Modal from '@/components/ui/modal';

const StoreModal = () => {
	const storeModal = useModalStore();

	return (
		<Modal
			title='Create Store'
			description='Create a new store'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Creat Store Form
		</Modal>
	);
};

export default StoreModal;
