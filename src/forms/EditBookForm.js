import useFields from '../hooks/useFields';

const EditBookForm =()=>{

  const initData ={

  }

const[formData,handleChange,resetFormData] = useFields(initData);

return <form class="LoginForm" action="index.html" method="post">
  <label><input type="text" name="" value={formData}/></label>
  <button type="submit" name="button">Log In</button>
</form>



}
export default EditBookForm;
