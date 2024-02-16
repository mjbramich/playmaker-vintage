'use client';

import { cn } from '@/lib/utils';
import useMobileMenuStore from '@/stores/mobile-menu';
import Footer from './footer';

const PageContainer = ({ children }: { children: React.ReactNode }) => {
	const { isOpen } = useMobileMenuStore();

	// When mobile menu opens/closes move page contents up/down y axis
	return (
		<div
			className={cn(
				' duration-700 transition-transform',
				isOpen ? 'translate-y-[318px]' : 'translate-y-0'
			)}
		>
			{children}
			<Footer />
		</div>
	);
};

export default PageContainer;
