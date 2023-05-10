import useFields from "../hooks/useFields";


const NoteForm =  ({ submit, note, submitText, closeForm }) => {

  const initData = note? {
    title: note.title,
    text: note.text,
  } :  {
    title: "",
    text: "",
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
            <label>Title
                <input type='text'  name="title" value={formData.title} onChange={handleChange}/>
              </label>

                  <label>Text
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
export default NoteForm;
