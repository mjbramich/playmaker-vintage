'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Image, Product } from '@prisma/client';
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
import ImageUpload from '@/components/ui/image-upload';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

interface Props {
	initialData:
		| (Product & {
				images: Image[];
		  })
		| null;
	categories: Category[];
}

const formSchema = z.object({
	name: z.string().min(1),
	size: z.string().min(1),
	price: z.number().min(1), // coerce to number ?
	category: z.string().min(1),
	images: z.object({ url: z.string() }).array()
});

type FormData = z.infer<typeof formSchema>;

const ProductForm = ({ initialData, categories }: Props) => {
	const params = useParams();
	const router = useRouter();

	// const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					...initialData,
					// Convert Decimal to Number
					price: Number(initialData?.price)
				}
			: {
					name: '',
					size: '',
					price: 0,
					category: '',
					images: []
				}
	});

	const toastMessage = initialData ? 'Product updated' : 'Product created';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);

			if (initialData) {
				// update Product
				await fetch(`/api/stores/${params.storeId}/products/${params.productId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			} else {
				// Create new Product
				await fetch(`/api/stores/${params.storeId}/products`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});
			}

			router.push(`/store/${params.storeId}/billboards`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

	// Form is ReactComponent, form is native html element
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8 '>
				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Images</FormLabel>
							<FormControl>
								<ImageUpload
									value={field.value.map((image) => image.url)}
									disabled={loading}
									onChange={(url) => field.onChange([...field.value, { url }])}
									onRemove={(url) =>
										field.onChange([...field.value].filter((image) => image.url !== url))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid gap-8 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 '>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled={loading} placeholder='Product name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input type='number' disabled={loading} placeholder='25.99' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='size'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Size</FormLabel>
								<Select
									disabled={loading}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue defaultValue={field.value} placeholder='Select a size' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{sizes.map((size) => (
											<SelectItem key={size} value={size}>
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categories</FormLabel>
								<Select
									disabled={loading}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue defaultValue={field.value} placeholder='Select a category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
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

export default ProductForm;
