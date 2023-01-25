import Card from '../../UI/Card';
import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<div className='flex h-[80vh] items-center justify-between px-[10%]'>
			<div>
				<h1 className='text-6xl font-bold mb-4'>Welcome, Friend</h1>
				<h2 className='text-5xl text-amber-400 font-bold'>to my todo list</h2>
			</div>
			<Card className=' bg-amber-400'>
				<div className=' w-[360px] border-b border-b-indigo-400 '>
					<img src='/to-do-list-apps.png' className='w-full' alt='todo image' />
				</div>
				<div className='text-center'>
					<Link
						className='py-1 px-5 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-gray-50 transition-all text-5xl my-8 border-2 rounded-xl font-bold inline-block'
						to='/signup'
					>
						GET STARTED
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default Home;
