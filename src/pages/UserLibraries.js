import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Card from "../pieces/Card";
import useAxios from "../hooks/useAxios";
import { UserContext } from "../context/context";

//shows all the users libraries
const UserLibraries = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const [reqLibraries, libraries, setLibraries] = useAxios(null);

  //gets all the users libraries
  useEffect(() => {
    reqLibraries("get", `/users/${username}/libraries`, "libraries");
  }, []);

  //deletes a library
  const deleteLibrary = async (id) => {
    const res = await reqLibraries("delete", `/libraries/${id}`);
    if (res.message === "Deleted!")
      setLibraries(libraries.filter((library) => library.id != id));
  };

  return (
    <div className="ListPage">
      <h1>{`${username}'s Libraries`}</h1>
      {libraries
        ? libraries.map((library) => (
            <div key={library.id}>
              <Card
                title={library.name}
                texts={[
                  library.description,
                  `${library.is_public ? "public" : "private"}`,
                ]}
                handleClick={() => navigate(`/library/${library.id}`)}
              />
              {currentUser.username === username ? (
                <button
                  type="button"
                  onClick={() => deleteLibrary(library.id)}
                  name="button"
                >
                  X
                </button>
              ) : null}
            </div>
          ))
        : null}
      {currentUser.username === username ? (
        <button
          type="button"
          onClick={() => navigate("/new/library")}
          name="button"
        >
          New Library
        </button>
      ) : null}
    </div>
  );
};
export default UserLibraries;
