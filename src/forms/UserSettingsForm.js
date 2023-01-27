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
<label>Username<input type="text" name="username" value={formData.username} onChange={handleChange}/></label>
<label>Old Password<input type="text" name="password" value={formData.password} onChange={handleChange}/></label>
<label>New Password<input type="text" name="password" value={formData.password} onChange={handleChange}/></label>
<label>First Name<input type="text" name="first_name" value={formData.first_name} onChange={handleChange}/></label>
<label>Last Name<input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/></label>
  <button type="submit" name="button">Done</button>
</form>


}
export default UserSettingsForm;
