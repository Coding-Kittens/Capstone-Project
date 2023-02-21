import useFields from "../hooks/useFields";
import { useParams } from "react-router-dom";

//a form to make a new library
const NewLibraryForm = ({ addLibrary }) => {
  const { id } = useParams();

  const initData = {
    name: "",
    description: "",
    is_public: false,
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    addLibrary(formData, id);
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Public
        <input
          type="checkbox"
          name="is_public"
          value={formData.is_public}
          onChange={handleChange}
        />
      </label>

      <button type="submit" name="button">
        Add
      </button>
    </form>
  );
};
export default NewLibraryForm;
