import useFields from '../hooks/useFields';

const ChangePasswordform =(changePassword)=>{

  const initData ={
old_password: '',
password: '',
new_password: '',
  }


  const[formData,handleChange,resetFormData] = useFields(initData);


  const handleSubmit=(event)=>{
    event.preventDefault();
    if(formData.password===formData.new_password){
      changePassword({formData.old_password,formData.password});
    }
    resetFormData();
  }

return <form className="LoginForm" action="index.html" method="post">
<label>Old Password<input type="text" name="old_password" value={formData.old_password} onChange={handleChange}/></label>
<label>New Password<input type="text" name="password" value={formData.password} onChange={handleChange}/></label>
<label>New Password again<input type="text" name="new_password" value={formData.new_password} onChange={handleChange}/></label>
  <button type="submit" name="button">Done</button>
</form>


}
export default ChangePasswordform;
