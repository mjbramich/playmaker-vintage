import prisma from '@lib/prismadb';
import { BillboardData, billboards } from '@/data/billboards';
import { collections, CollectionData } from '@/data/collections';
import { products, ProductData } from '@/data/products';

// This seed file is executed using ts-node and is configured to compile to CommonJS as specified in package.json.
// Note: There is a known issue with ts-node when using Node.js v20. Refer to https://github.com/TypeStrong/ts-node/issues/1997 for details.
// Notes on tranforming TS with ts-node to run in node environment https://typestrong.org/ts-node/docs/imports

async function seedBillboards() {
	try {
		// Create the "revenue" table if it doesn't exist

		const insertedBillboards = await Promise.all(
			billboards.map(async (billboard: BillboardData) =>
				prisma.billboard.create({
					data: billboard
				})
			)
		);

		console.log(`Billboards Inserted: ${insertedBillboards.length}`);

		return insertedBillboards;
	} catch (error) {
		console.error('Error seeding billboards:', error);
		throw error;
	}
}

async function seedCollections() {
	try {
		const insertedCollections = await Promise.all(
			collections.map(async (collection: CollectionData) =>
				prisma.collection.create({
					data: collection
				})
			)
		);

		console.log(`Collections Inserted: ${insertedCollections.length}`);
	} catch (error) {
		console.error('Error seeding collections:', error);
		throw error;
	}
}

async function seedProducts() {
	try {
		const insertedProducts = await Promise.all(
			products.map(async (product: ProductData) =>
				prisma.product.create({
					data: {
						...product,
						images: {
							createMany: {
								data: product.images
							}
						}
					}
				})
			)
		);

		console.log(`Products Inserted: ${insertedProducts.length}`);
	} catch (error) {
		console.error('Error seeding products:', error);
		throw error;
	}
}

(async function main() {
	try {
		await seedBillboards();
		await seedCollections();
		await seedProducts();
	} catch (e) {
		console.error(e);
		process.exit(1); // Exit with an error
	} finally {
		await prisma.$disconnect();
	}
})();
