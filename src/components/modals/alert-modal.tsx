'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';

interface Props {
	title: string;
	desc: string;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onConfirm: () => void;
	loading: boolean;
}

const AlertModal = ({ title, desc, isOpen, setIsOpen, onConfirm, loading }: Props) => (
	<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{desc}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction disabled={loading} onClick={onConfirm}>
					Are you sure?
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

export default AlertModal;
