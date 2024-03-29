'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Collection, Prisma } from '@prisma/client';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/image-upload';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

// Create Product type with images populated
type ProductWithImages = Prisma.ProductGetPayload<{
	include: {
		images: true;
	};
}>;

interface FormattedProduct extends Omit<ProductWithImages, 'price'> {
	price: string;
}

interface Props {
	initialData: FormattedProduct | null;
	collections: Collection[];
}

const formSchema = z.object({
	name: z.string().min(1),
	price: z.coerce.number().min(1), // coerce to number ?
	size: z.string().min(1),
	description: z.string().min(1),
	collectionId: z.string().min(1),
	images: z.object({ url: z.string() }).array().nonempty(),
	featured: z.boolean().default(false).optional(),
	archived: z.boolean().default(false).optional()
});

type FormData = z.infer<typeof formSchema>;

const ProductForm = ({ initialData, collections }: Props) => {
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
					// Convert price from String to Number for form
					price: parseFloat(String(initialData.price))
				}
			: {
					name: '',
					size: '',
					price: 0,
					description: '',
					collectionId: '',
					images: [],
					featured: false,
					archived: false
				}
	});

	const toastMessage = initialData ? 'Product updated' : 'Product created';
	const action = initialData ? 'Save changes' : 'Create';

	const onSubmit = async (formData: FormData) => {
		try {
			setLoading(true);

			const url = initialData
				? `/api/store/products/${params.productId}` // Update Product
				: `/api/store/products`; // Create Product

			const method = initialData ? 'PATCH' : 'POST';

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const { error } = await response.json();
				throw new Error(error);
			}

			router.push(`/admin/products`);
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
				<div className='grid gap-8 sm:grid-cols-2 lg:max-w-4xl  '>
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
						name='collectionId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>collections</FormLabel>
								<Select
									disabled={loading}
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue defaultValue={field.value} placeholder='Select a collection' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{/* eslint-disable-next-line */}
										{collections.map((collection) => (
											<SelectItem key={collection.id} value={collection.id}>
												{collection.name}
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
						name='description'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder='Info about the product'
										className='col-span-2'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='featured'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Featured</FormLabel>
									<FormDescription>This product will appear on the home page</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='archived'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Archived</FormLabel>
									<FormDescription>
										This product will not appear anywhere in the store.
									</FormDescription>
								</div>
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
