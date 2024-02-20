import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image as ProductImage } from '@prisma/client';

interface Props {
	productImages: ProductImage[];
}

const ProductGallery = ({ productImages }: Props) => (
	<Tabs defaultValue={productImages[0].id} className='flex flex-col  gap-8'>
		{/* Tab Panel Display */}
		<div className=' w-full'>
			{productImages.map((image) => (
				<TabsContent value={image.id} key={image.id} className='relative aspect-square rounded-xl '>
					<Image
						src={image.url}
						alt='account'
						fill
						className='h-full w-full overflow-hidden rounded-lg object-cover object-center'
					/>
				</TabsContent>
			))}
		</div>

		{productImages.length > 1 && (
			<TabsList className='gap-4'>
				{productImages.map((image) => (
					<TabsTrigger value={image.id} key={image.id} className='relative aspect-square flex-1 '>
						<Image
							src={image.url}
							alt='account'
							fill
							className='overflow-hidden rounded-lg object-cover object-center'
						/>
					</TabsTrigger>
				))}
			</TabsList>
		)}
	</Tabs>
);

export default ProductGallery;
