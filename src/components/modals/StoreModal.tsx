'use-client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useModalStore from '@/stores/modal';
import Modal from '@/components/ui/modal';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' })
});
const StoreModal = () => {
	const storeModal = useModalStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ''
		}
	});

	// Handle form submission
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Modal
			title='Create Store'
			description='Create a new store'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div className='space-y-4 py-2 pb-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center justify-end space-x-2 pt-6 '>
							<Button variant='outline' onClick={storeModal.onClose}>
								Cancel
							</Button>
							<Button type='submit'>Continue</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};

export default StoreModal;
