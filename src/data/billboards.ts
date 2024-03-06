import { v4 as uuid } from 'uuid';

export interface BillboardData {
	id: string;
	label: string;
	imageUrl: string;
}

const billboards: BillboardData[] = [
	{
		id: uuid(),
		label: 'Playmaker Vintage',
		imageUrl:
			'https://res.cloudinary.com/dnphod5n3/image/upload/v1709619620/ueul84djwsu66cdhwemw.png'
	},
	{
		id: uuid(),
		label: 'T-shirts',
		imageUrl:
			'https://res.cloudinary.com/dnphod5n3/image/upload/v1709100930/vgzoxecb0mpuckazfo2z.jpg'
	},
	{
		id: uuid(),
		label: 'Sweaters',
		imageUrl:
			'https://res.cloudinary.com/dnphod5n3/image/upload/v1709100531/fqi3a3xsltkb2hkikxhq.jpg'
	},
	{
		id: uuid(),
		label: 'Jackets',
		imageUrl:
			'https://res.cloudinary.com/dnphod5n3/image/upload/v1709101490/gqu7ncblz2gk0nuqonhh.jpg'
	}
];

// Have to export types and modules seperately (isolatedModules)
export { billboards };
