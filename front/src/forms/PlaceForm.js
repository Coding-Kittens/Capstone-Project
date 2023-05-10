
import useFields from "../hooks/useFields";

const PlaceForm  =  ({ submit, place, submitText, closeForm }) => {

  const initData = place? {
    name: place.name,
    description: place.description,
    extra_info: place.extra_info,
    is_public: place.is_public,
  } :  {
    name: "",
    description: "",
    extra_info: "",
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

                  <label>Description
                <textarea name="description" rows="10" cols="15" value={formData.description} onChange={handleChange}></textarea>
                </label>

                <label>Extra info
              <textarea name="extra_info" rows="10" cols="15" value={formData.extra_info} onChange={handleChange}></textarea>
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
export default PlaceForm;
