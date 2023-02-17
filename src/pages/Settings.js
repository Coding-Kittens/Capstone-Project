import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThemeContext} from '../context/context';
import useFields from '../hooks/useFields';
import themes from '../data/themes';
const Settings =()=>{
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
    const initData ={
  theme: 0,
    }


    const[formData,handleChange,resetFormData] = useFields(initData);

const changeTheme=(event)=>{
  handleChange(event);
  theme['changeTheme'](event.target.value);
}


    const handleSubmit=(event)=>{
      event.preventDefault();
      theme['changeTheme'](formData.theme);
      localStorage.setItem('theme',JSON.stringify(formData.theme));
      resetFormData();
      navigate('/');
    }

  return <form className="LoginForm" onSubmit={handleSubmit}>
  <label>Light<input type="radio" name="theme" value={0} onChange={changeTheme}/></label>
  <label>Dark<input type="radio" name="theme" value={1} onChange={changeTheme}/></label>
    <button type="submit" name="button">Save</button>
  </form>

}
export default Settings;