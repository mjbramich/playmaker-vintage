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

export interface Category {
	id: string;
	name: string;
	billboard: Billboard;
}
export interface CategoryColumn {
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
	categoryId: string;
	category: string;
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
	category: string;
	featured: boolean;
	archived: boolean;
	createdAt: string;
}

export interface OrderColumn {
	id: string;
	phone: string;
	address: string;
	products: string[];
	total: string;
	paid: boolean;
	createdAt: string;
}
