import useFields from "../hooks/useFields";
import "../css/SignUpForm.css";

//a form to register/sign-up a user
const SignUpForm = ({ signUp }) => {
  const initData = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp(formData);
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
      <label>
        First Name
        <input
          required
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name
        <input
          required
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </label>
      <button type="submit" name="button">
        Sign Up!
      </button>
    </form>
  );
};
export default SignUpForm;
