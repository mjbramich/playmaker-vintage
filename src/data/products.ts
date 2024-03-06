import { collections } from './collections';

export interface ProductData {
	collectionId: string;
	name: string;
	size: string;
	description: string;
	price: number;
	images: Image[];
}

interface Image {
	url: string;
}

// Collections[0] = T-shirt
// Collections[1] = Sweaters
// Collections[2] = Jackets

const products: ProductData[] = [
	{
		collectionId: collections[0].id,
		name: 'ASTROS 1997 STARTER T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 78 cm 
        width: 58 cm`,
		price: 120,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709424881/pbaryoelit1fv2wvwoaf.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'ROCKETS 1995 CHAMPS T-SHIRT (M)',
		size: 'M',
		description: `condition: excellent, no stains or holes
        height: 68 cm 
        width: 47 cm`,
		price: 90,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709624538/T-shirts/rqff0dvye3ocsbfcry3s.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'COWBOYS PRO PLAYER T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 73 cm 
        width: 59 cm`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709699442/T-shirts/rmixjwxfwsifi65i1kul.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'COWBOYS SUPERBOWL XXX T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 70 cm 
        width: 53.5 cm`,
		price: 110,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709699600/T-shirts/durvncf7qotdjvnikdy6.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'RAIDER NATION T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 72 cm 
        width: 60 cm`,
		price: 90,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709699717/T-shirts/svvdnan1ltk97ovvhypr.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709699726/T-shirts/vttns1c1kmxnmolpldf8.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'BEARS LOGO 7 T-SHIRT (XL)',
		size: 'XL',
		description: `condition: good, no stains or holes
        height: 77 cm 
        width: 53 cm`,
		price: 80,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709699927/T-shirts/hehylxcgjndovg8idiet.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'GATORS 96 NAT CHAMPS T-SHIRT (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
        height: 74 cm 
        width: 57 cm`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709700134/T-shirts/kca30spumcfjg5y2dtbo.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709700141/T-shirts/skekpmem7q0s4erpdhyt.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'SUPERBOWL XXV T-SHIRT',
		size: 'ONE SIZE',
		description: `condition: excellent, no stains or holes
        height: 68 cm 
        width: 59 cm`,
		price: 80,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709700396/T-shirts/pzucqvvzdwxkksovchxi.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'BILLS CHAMPION XXL T-SHIRT',
		size: 'XXL',
		description: `condition: good, minor stain below I
        height: 71 cm 
        width: 66 cm`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701530/DSCN0349_i7hnas.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'REDSKINS LEE SPORT SWEATER (L)',
		size: 'L',
		description: `condition: good, no stains or holes
        height: 67 cm 
        width: 62 cm`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701527/DSCN0350_ocxvw0.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'UAB BLAZERS T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 71 cm 
        width: 53 cm`,
		price: 60,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701350/DSCN0353_usaphb.jpg'
			}
		]
	},
	{
		collectionId: collections[2].id,
		name: 'JAGUARS STARTER JACKET (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 69 cm 
        width: 64 cm`,
		price: 200,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701525/DSCN0356_ptisjc.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701523/DSCN0357_k6pihl.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701423/DSCN0360_uekbc6.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'BULLS GOAT STARTER T-SHIRT (XL)',
		size: 'XL',
		description: `condition: mint, no stains or holes
        height: 75 cm 
        width: 60 cm`,
		price: 175,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701529/DSCN0363_figkyv.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701522/DSCN0371_gh1mlb.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: '49ers 1994 NFC CHAMPS START T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
        height: 70 cm 
        width: 57 cm`,
		price: 125,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701532/DSCN0374_rqkrch.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701539/DSCN0376_mjrxkr.jpg'
			}
		]
	},
	{
		collectionId: collections[2].id,
		name: 'GIANTS STARTER JACKET (XL)',
		size: 'L',
		description: `condition: excellent, no stains or holes`,
		price: 200,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701538/DSCN0382_xn9dfe.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701539/DSCN0386_duknu3.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701538/DSCN0381_yldq0y.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'GATORS STARTER SWEATER (L)',
		size: 'L',
		description: `condition: good, no stains or holes
		height: 69 cm 
        width: 64 cm
		`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701535/DSCN0390_y4zf98.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'MAGIC 1995 CONFERENCE CHAMPS T-SHIRT (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 78 cm 
        width: 62 cm
		`,
		price: 110,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701534/DSCN0387_sw4ark.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'TRAILBLAZERS 1992 CONFERENCE CHAMPS (M)',
		size: 'M',
		description: `condition: excellent, no stains or holes
		height: 70 cm 
        width: 47 cm
		`,
		price: 110,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701539/DSCN0391_ndc62b.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'BLAZERS 1992 CONFERENCE CHAMPS (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
		height: 68 cm 
        width: 51 cm
		`,
		price: 110,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701539/DSCN0393_krlwyu.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'PISTONS HANES SWEATER (M)',
		size: 'L',
		description: `condition: excellent, no stains or holes
		height: 68 cm 
        width: 55 cm
		`,
		price: 80,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701534/DSCN0396_obrk7r.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: '1995 NBA FINALS STARTER T-SHIRT (M)',
		size: 'M',
		description: `condition: excellent, no stains or holes
		height: 68 cm 
        width: 51 cm
		`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701532/DSCN0402_f7qvwu.jpg'
			},
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701518/DSCN0399_hhvcve.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: '1995 SUNS DIVISION CHAMPS T-SHIRT (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 79 cm 
        width: 62 cm
		`,
		price: 110,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701534/DSCN0405_dttfax.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'EAGLES NFL T-SHIRT (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 72 cm 
        width: 58 cm
		`,
		price: 70,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709100623/jgqliau5zmgxrk3rx2lg.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'CHIEFS REEBOK SWEATER (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 73 cm 
        width: 66 cm
		`,
		price: 120,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709705744/DSCN0329_fllshm.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'PANTHERS STARTER SWEATER (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 72 cm 
        width: 66 cm
		`,
		price: 150,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701678/DSCN0316_ulerxl.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'TAR HEELS 2005 NCAA CHAMPS T-SHIRT (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
		height: 77 cm 
        width: 53 cm
		`,
		price: 60,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709705742/DSCN0322_ogtpc5.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'DOLPHINS HELMET LEE T-SHIRT (XXL)',
		size: 'XXL',
		description: `condition: excellent, no stains or holes
		height: 85.5 cm 
        width: 62 cm
		`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701679/DSCN0323_astx7g.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'SEAHAWKS NFL SWEATER (XL)',
		size: 'XL',
		description: `condition: excellent, no stains or holes
		height: 70 cm 
        width: 68 cm
		`,
		price: 125,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701678/DSCN0328_beoqog.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: 'PANTHERS 1993 TRENCH T-SHIRT (L)',
		size: 'L',
		description: `condition: good, no stains or holes
		height: 71 cm 
        width: 52 cm
		`,
		price: 70,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701677/DSCN0318_lkui2p.jpg'
			}
		]
	},
	{
		collectionId: collections[1].id,
		name: 'PACKERS NFL SWEATER (L)',
		size: 'L',
		description: `condition: excellent, no stains or holes
		height: 70 cm 
        width: 66 cm
		`,
		price: 100,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701657/DSCN0314_yibnjk.jpg'
			}
		]
	},
	{
		collectionId: collections[0].id,
		name: '1994 PACKERS NFL T-SHIRT (L)',
		size: 'L',
		description: `condition: good, no stains, minor pin holes back of collar
		height: 74 cm 
        width: 51 cm
		`,
		price: 50,
		images: [
			{
				url: 'https://res.cloudinary.com/dnphod5n3/image/upload/v1709701675/DSCN0319_yweddg.jpg'
			}
		]
	}
];

// TODO ADD MORE PRODUCTS

// Have to export types and modules seperately (isolatedModules)
export { products };
