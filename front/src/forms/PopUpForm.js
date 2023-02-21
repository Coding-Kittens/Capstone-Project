import useFields from "../hooks/useFields";
import { v4 as uuidv4 } from 'uuid';
//takes inputs and makes a small popup form for it
//
//takes:
//functions to submit and close the form
//the text on the submit btn
//the initData
//the inputs witch is a list of objs [{title,name,type}]
////
//title is the label text
//name is the input name
//type is the type of input and is optianal it defalts to text
const PopUpForm = ({ submit, inputs, initData, submitText, closeForm }) => {
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
        {inputs
          ? inputs.map((input) => (
              <label key={uuidv4()}>
                {input.title}
                <input
                  type={input.type ? input.type : "text"}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                />
              </label>
            ))
          : null}
        {closeForm ? (
          <button type="button" onClick={closeForm} name="button">
            Cancle
          </button>
        ) : null}
        <button type="submit" name="button">
          {submitText}
        </button>
      </form>
    </>
  );
};
export default PopUpForm;
