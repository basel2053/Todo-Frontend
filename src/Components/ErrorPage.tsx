import Header from './Layout/Header/Header';

const ErrorPage = () => {
	return (
		<>
			<Header />
			<h1 className='mt-10 text-center text-6xl text-amber-400'>
				Page Not Found<span className='text-gray-50'>...</span>{' '}
			</h1>
		</>
	);
};

export default ErrorPage;
