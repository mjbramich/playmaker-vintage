interface HeadingProps {
	title: string;
	description: string;
	children?: React.ReactNode;
}

const Heading = ({ title, description, children }: HeadingProps) => (
	<div>
		<h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
		<p className='text-sm text-muted-foreground'>{description}</p>
		{children}
	</div>
);

export default Heading;
