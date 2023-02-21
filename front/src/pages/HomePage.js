import { UserContext } from "../context/context";
import { useContext } from "react";
import LoggedInPage from "./LoggedInPage";
import LoggedOutPage from "./LoggedOutPage";

//shows the logged in home page if logged in
//shows the logged put home page if logged out
const HomePage = () => {
  const currentUser = useContext(UserContext);

  return (
    <>
      {currentUser ? (
        <LoggedInPage username={currentUser.username} />
      ) : (
        <LoggedOutPage />
      )}
    </>
  );
};

export default HomePage;
