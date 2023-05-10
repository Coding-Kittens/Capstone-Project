import useFields from "../hooks/useFields";
const CharacterForm = ({ submit, char, submitText, closeForm }) => {

  const initData = char? {
    name: char.name,
    birthday: char.birthday,
    description: char.description,
    extra_info: char.extra_info,
    story: char.story,
    is_public: char.is_public,
  } :  {
    name: '',
    birthday: '',
    description: '',
    extra_info: '',
    story: '',
    is_public: false,
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
            <label>Name
                <input type='text'  name="name" value={formData.name} onChange={handleChange}/>
              </label>
              <label>Birthday
                  <input type='text'  name="birthday" value={formData.birthday} onChange={handleChange}/>
                </label>

                  <label>Description
                <textarea name="description" rows="10" cols="15" value={formData.description} onChange={handleChange}></textarea>
                </label>

                <label>Extra info
              <textarea name="extra_info" rows="10" cols="15" value={formData.extra_info} onChange={handleChange}></textarea>
              </label>

              <label>Backstory
            <textarea name="story" rows="10" cols="15" value={formData.story} onChange={handleChange}></textarea>
            </label>

                <label>Public
                    <input type="checkbox"  name="is_public" value={formData.is_public} onChange={handleChange}/>
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
export default CharacterForm;
