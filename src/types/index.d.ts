export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export type ProductColumn = {
	id: string;
	name: string;
	size: string;
	price: number;
	category: string;
	createdAt: string;
};
