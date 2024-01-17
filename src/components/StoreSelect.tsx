'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useModalStore from '@/stores/modal';

// extract prop types of a component excluding the ref prop
type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

// Add stores array to the component props
interface StoreSwitcherProps extends PopoverTriggerProps {
	stores: Record<string, any>[];
}

const StoreSelect = ({ className, stores = [] }: StoreSwitcherProps) => {
	const [open, setOpen] = React.useState(false);
	const storeModal = useModalStore();
	const params = useParams();
	const router = useRouter();

	// grab just the label and value from the stores being passed down as props
	const formattedStores = stores.map((store) => ({
		name: store.name,
		value: store.id
	}));

	const currentStore = formattedStores.find((store) => store.value === params.storeId);

	const onStoreSelect = (store: { value: string; name: string }) => {
		setOpen(false);
		// router.push add new entry into history stack, so we can use it with back button
		router.push(`/store/${store.value}`);
	};

	// ComboBox component from shadcn ui
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-expanded={open}
					aria-label='Select a store'
					className={cn('w-[200px] justify-between', className)}
				>
					<Store className='mr-2 h-4 w-4' />
					{currentStore?.name}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Search store...' />
						<CommandEmpty>No store found.</CommandEmpty>
						<CommandGroup heading='Stores'>
							{formattedStores.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className='text-sm'
								>
									<Store className='mr-2 h-4 w-4' />
									{store.name}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											currentStore?.value === store.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className='mr-2 h-5 w-5' />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default StoreSelect;
