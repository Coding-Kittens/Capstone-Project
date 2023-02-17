import {UserContext} from '../context/context';
import {useContext} from 'react';
import LoggedInPage from './LoggedInPage';
import LoggedOutPage from './LoggedOutPage';
const HomePage =()=>{
  const currentUser = useContext(UserContext);

return <>
{currentUser? <LoggedInPage username={currentUser.username}/> : <LoggedOutPage/>}
</>
}

export default HomePage;
