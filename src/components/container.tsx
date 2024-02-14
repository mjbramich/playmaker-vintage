interface Props {
	children: React.ReactNode;
}

const Container = ({ children }: Props) => <div className='mx-auto max-w-7xl'>{children}</div>;

export default Container;
