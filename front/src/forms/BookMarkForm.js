
import useFields from "../hooks/useFields";


const BookMarkForm =  ({ submit, initData, submitText, closeForm }) => {


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
                  <label>Note
                <textarea name="text" rows="10" cols="15" value={formData.text} onChange={handleChange}></textarea>
                </label>

          <button type="button" onClick={closeForm} name="button">
            Cancle
          </button>

        <button type="submit" name="button">
          {submitText}
        </button>
      </form>
    </>
  );
};
export default BookMarkForm;
