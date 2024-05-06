'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioItem,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const SortFilter = () => {
	const router = useRouter();
	// const pathname = usePathname();
	const searchParams = useSearchParams();

	// TODO add validation for sort on this component
	const [position, setPosition] = useState(searchParams.get('sort') || 'name-asc');

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			params.set('page', '1'); // If user changes sort, reset page to 1
			return params.toString();
		},
		[searchParams]
	);

	const handleChange = (value: string) => {
		setPosition(value);
		// Don't need pathname because we want to stay on same page and only change query params
		router.push(`?${createQueryString('sort', value)}`);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Sort</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Sort By</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
					<DropdownMenuRadioItem value='name-asc'>Alphabetically, A-Z</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='name-desc'>Alphabetically, Z-A</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='price-asc'>Price, low-high</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='price-desc'>Price, high-low</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='createdAt-desc'>Date, new-old</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='createdAt-asc'>Date, old-new</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortFilter;
