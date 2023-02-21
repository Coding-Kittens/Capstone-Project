import { useContext } from "react";
import { ThemeContext } from "../context/context";
import useFields from "../hooks/useFields";

//a form to change the theme of the site
const ThemeForm = () => {
  const theme = useContext(ThemeContext);

  const [formData, handleChange] = useFields();

  const changeTheme = (event) => {
    handleChange(event);
    theme["changeTheme"](event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    theme["changeTheme"](formData.theme);
    localStorage.setItem("theme", JSON.stringify(formData.theme));
  };

  return (
    <form className="ThemeForm" onSubmit={handleSubmit}>
      <label>
        Light
        <input type="radio" name="theme" value={0} onChange={changeTheme} />
      </label>
      <label>
        Dark
        <input type="radio" name="theme" value={1} onChange={changeTheme} />
      </label>
      <button type="submit" name="button">
        Save
      </button>
    </form>
  );
};
export default ThemeForm;
