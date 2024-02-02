'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
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
	initialData: Category | null; // billboard may not always exist
	billboards: Billboard[];
}

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1)
});

type FormData = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData, billboards }: Props) => {
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

	const toastMessage = initialData ? 'Category updated.' : 'Category created.';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);

			if (initialData) {
				// update Billboard
				await fetch(`/api/stores/${params.storeId}/categories/${params.categoryId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			} else {
				// Create new Billboard
				await fetch(`/api/stores/${params.storeId}/categories`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			}

			router.push(`/store/${params.storeId}/categories`);
			router.refresh();
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
				<div className='grid grid-cols-3 gap-8'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={loading} placeholder='Category Name' {...field} />
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

export default CategoryForm;
