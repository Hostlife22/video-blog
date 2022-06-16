import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/auth.selectors';

function Home() {
  const user = useSelector(selectUser);
  return <div>Home</div>;
}

export default Home;
