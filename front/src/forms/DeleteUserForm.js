import useFields from "../hooks/useFields";

const DeleteUserForm = ({ submit, closeForm }) => {

  const initData = {
    password: "",
  };
  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(formData);
    resetFormData();
    closeForm();
  };

  return (
    <>
      <form className="PopUp" onSubmit={handleSubmit}>
            <label>Password
                <input type='text'  name="password" value={formData.password} onChange={handleChange}/>
              </label>

          <button type="button" onClick={closeForm} name="button">
            Cancle
          </button>

        <button type="submit" name="button">
          Im sure, Delete Account!
        </button>
      </form>
    </>
  );
};
export default DeleteUserForm;
