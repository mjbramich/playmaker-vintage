'use client';

import { currencyFormatter } from '@/lib/utils';
import useMounted from '@/hooks/useMounted';

interface Props {
	value: string | number;
}

const Price = ({ value }: Props) => {
	const { mounted } = useMounted();

	// only run on mount, to avoid hydration issues, since data will be different to whats on the server
	if (!mounted) {
		return null;
	}

	return (
		<p className='text-base font-medium text-gray-900'>{currencyFormatter.format(Number(value))}</p>
	);
};

export default Price;
