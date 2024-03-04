import { Image } from '@prisma/client';

export interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}

export interface BillboardColumn {
	id: string;
	label: string;
	createdAt: string;
}

export interface Collection {
	id: string;
	name: string;
	billboard: Billboard;
}
export interface CollectionColumn {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
}

export interface Product {
	id: string;
	name: string;
	size: string;
	price: string;
	description: string;
	collectionId: string;
	collection: string;
	featured: boolean;
	archived: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ProductWithImage extends Product {
	images: Image[];
}

export interface ProductColumn {
	id: string;
	name: string;
	size: string;
	price: string;
	collection: string;
	featured: boolean;
	archived: boolean;
	createdAt: string;
}

export interface OrderColumn {
	id: string;
	name: string;
	phone: string;
	address: string;
	orderItems: OrderItem[];
	total: string;
	isPaid: boolean;
	createdAt: string;
}

export interface OrderItem {
	id: string;
	name: string;
	collection: string;
}

export interface NavLinks {
	href: string;
	name: string;
	active: boolean;
}
