'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '../ui/image-upload';

interface Props {
	initialData: Billboard | null; // billboard may not always exist
}

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1)
});

type FormData = z.infer<typeof formSchema>;

const BillboardForm = ({ initialData }: Props) => {
	const params = useParams();
	const router = useRouter();

	// const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: ''
		}
	});

	const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);

			if (initialData) {
				// update Billboard
				await fetch(`/api/stores/${params.storeId}/billboards/${params.billboardId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			} else {
				// Create new Billboard
				await fetch(`/api/stores/${params.storeId}/billboards`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			}

			router.refresh();
			router.push(`/store/${params.storeId}/billboards`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	// Form is ReactComponent, form is native html element
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8 '>
				<FormField
					control={form.control}
					name='imageUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Background image</FormLabel>
							<FormControl>
								<ImageUpload
									value={field.value ? [field.value] : []}
									disabled={loading}
									onChange={(url) => field.onChange(url)}
									onRemove={() => field.onChange('')}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-3 gap-8'>
					<FormField
						control={form.control}
						name='label'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Label</FormLabel>
								<FormControl>
									<Input disabled={loading} placeholder='Billboard label' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={loading} type='submit' className='ml-auto'>
					{action}
				</Button>
			</form>
		</Form>
	);
};

export default BillboardForm;
