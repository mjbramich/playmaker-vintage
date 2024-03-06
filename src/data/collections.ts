import { v4 as uuid } from 'uuid';

import { billboards } from './billboards';

export interface CollectionData {
	id: string;
	name: string;
	billboardId: string;
}

const collections: CollectionData[] = [
	{ id: uuid(), name: 't-shirts', billboardId: billboards[1].id },
	{ id: uuid(), name: 'sweaters', billboardId: billboards[2].id },
	{ id: uuid(), name: 'jackets', billboardId: billboards[3].id }
];

// Have to export types and modules seperately (isolatedModules)
export { collections };
