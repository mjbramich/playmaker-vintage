import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ToastProvider from '@/providers/toastProvider';
import '@css/globals.css';
import { cn } from '@lib/utils';
import prisma from '@/lib/prismadb';

import Navbar from '@/components/navigation/navbar';
import PageContainer from '@/components/page-container';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
});

export const metadata: Metadata = {
	title: 'Playmaker Vintage | Vintage Sports Clothing',
	description:
		'Discover iconic styles straight from the US at Playmaker Vintage. Elevate your game with our latest arrivals of vintage sports clothing.',
	icons: {
		icon: [
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				url: '/favicon/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				url: '/favicon/favicon-16x16.png'
			},
			{
				rel: 'icon',
				url: '/favicon/favicon.ico'
			}
		],
		shortcut: '/favicon/shortcut.png',
		apple: [{ url: '/favicon/apple-touch-icon.png' }],
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/favicon/apple-touch-icon-precomposed.png'
		}
	}
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const collections = await prisma.collection.findMany({
		include: {
			billboard: true
		}
	});

	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
					<ToastProvider />
					<Navbar collections={collections} />
					<PageContainer>{children}</PageContainer>
				</body>
			</html>
		</ClerkProvider>
	);
}
