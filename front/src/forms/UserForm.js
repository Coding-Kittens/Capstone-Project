import useFields from "../hooks/useFields";
const UserForm =  ({ submit, user}) => {

  const initData = user? {
    first_name: user.first_name,
    last_name: user.last_name,
    bio: user.bio ? user.bio : "",
  } : {
    first_name: "",
    last_name: "",
    bio: "",
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(formData);
    resetFormData();
  };

  return (
    <>
      <form className="PopUp" onSubmit={handleSubmit}>
            <label>First Name
                <input type='text'  name="first_name" value={formData.first_name} onChange={handleChange}/>
              </label>
              <label>Last Name
                  <input type='text'  name="last_name" value={formData.last_name} onChange={handleChange}/>
                </label>
                  <label>Bio
                <textarea name="bio" rows="10" cols="15" value={formData.bio} onChange={handleChange}></textarea>
                </label>

        <button type="submit" name="button">
          Save
        </button>
      </form>
    </>
  );
};
export default UserForm;
