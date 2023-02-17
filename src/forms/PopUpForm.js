
import useFields from '../hooks/useFields';

const PopUpForm =({submit,inputs,initData,submitText,closeForm})=>{


const[formData,handleChange,resetFormData] = useFields(initData);


const handleSubmit=(event)=>{
  event.preventDefault();
  submit(formData);
  resetFormData();
  closeForm();
}

return <><form className="LoginForm"  onSubmit={handleSubmit}>
{inputs? inputs.map(input=><label>{input.title}<input type={input.type? input.type: 'text'} name={input.name} value={formData[input.name]} onChange={handleChange}/></label>):null}
<button type="submit" name="button">{submitText}</button>
</form>
<button type="button" onClick={closeForm} name="button">Cancle</button>
</>



}
export default PopUpForm;
