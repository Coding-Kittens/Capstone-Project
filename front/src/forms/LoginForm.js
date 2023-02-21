import useFields from "../hooks/useFields";
import "../css/Form.css";

//a form to login a user
const LoginForm = ({ login }) => {
  const initData = {
    username: "",
    password: "",
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData);
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label>
        Username
        <input
          required
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          required
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" name="button">
        Log In
      </button>
    </form>
  );
};
export default LoginForm;
