import useFields from "../hooks/useFields";
import { useParams } from "react-router-dom";

//a form to add a new book
const NewBookForm = ({ addBook }) => {
  const { id } = useParams();

  let initData = {
    title: "",
    synopsys: "",
    text_color: "#000000",
    cover_color: "#ffffff",
    theme: 0,
    is_public: false,
  };

  const [formData, handleChange, resetFormData] = useFields(initData);

  const handleSubmit = (event) => {
    event.preventDefault();
    addBook(formData, id);
    resetFormData();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label>
        title
        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        synopsys
        <input
          type="text"
          name="synopsys"
          value={formData.synopsys}
          onChange={handleChange}
        />
      </label>
      <label>
        Title text color
        <input
          type="color"
          name="text_color"
          value={formData.text_color}
          onChange={handleChange}
        />
      </label>
      <label>
        Cover color
        <input
          type="color"
          name="cover_color"
          value={formData.cover_color}
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
        Write!
      </button>
    </form>
  );
};
export default NewBookForm;
