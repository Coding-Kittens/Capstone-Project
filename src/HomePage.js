
import LoggedInPage from './LoggedInPage';
import LoggedOutPage from './LoggedOutPage';
const HomePage =({currentUser})=>{


return <>
{currentUser? <LoggedInPage username={currentUser.username}/> : <LoggedOutPage/>}
</>
}

export default HomePage;
