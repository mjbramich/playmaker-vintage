'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Collection } from '@prisma/client';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface Props {
	initialData: Collection | null; // billboard may not always exist
	billboards: Billboard[];
}

const formSchema = z.object({
	name: z.string().min(1).trim().toLowerCase(), // make lowercase so no issues with routing
	billboardId: z.string().min(1)
});

type FormData = z.infer<typeof formSchema>;

const CollectionForm = ({ initialData, billboards }: Props) => {
	const params = useParams();
	const router = useRouter();

	// const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: ''
		}
	});

	const toastMessage = initialData ? 'collection updated.' : 'collection created.';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);

			const url = initialData
				? `/api/store/collections/${params.collectionId}` // Update a collection
				: `/api/store/collections`; // Create a collection

			const method = initialData ? 'PATCH' : 'POST';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			router.push(`/admin/collections`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	// Form is ReactComponent, form is native html element
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8 '>
				<div className='grid grid-cols-3 gap-8'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={loading} placeholder='collection Name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='billboardId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Billboard</FormLabel>
								<Select
									disabled={loading}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue defaultValue={field.value} placeholder='Select a billboard' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{billboards.map((billboard) => (
											<SelectItem key={billboard.id} value={billboard.id}>
												{billboard.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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

export default CollectionForm;
