import useFields from "../hooks/useFields";

//a form to change the users Password
const ChangePasswordform = ({ changePassword }) => {
  const initData = {
    old_password: "",
    password: "",
    new_password: "",
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === formData.new_password) {
      changePassword({
        old_password: formData.old_password,
        password: formData.password,
      });
    }
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label>
        Old Password
        <input
          required
          type="text"
          name="old_password"
          value={formData.old_password}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password
        <input
          required
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password again
        <input
          required
          type="text"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" name="button">
        Change Password
      </button>
    </form>
  );
};
export default ChangePasswordform;
