import useFields from '../hooks/useFields';

const UserSettingsForm =(editUser)=>{

  const initData ={
username: '',
password: '',
first_name: '',
last_name: '',
  }


  const[formData,handleChange,resetFormData] = useFields(initData);


  const handleSubmit=(event)=>{
    event.preventDefault();
    editUser(formData);
    resetFormData();
  }

return <form className="LoginForm" action="index.html" method="post">
<label>First Name<input type="text" name="first_name" value={formData.first_name} onChange={handleChange}/></label>
<label>Last Name<input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/></label>

  <button type="submit" name="button">Done</button>
</form>


}
export default UserSettingsForm;
