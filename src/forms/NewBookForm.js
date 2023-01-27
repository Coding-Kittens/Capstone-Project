import useFields from '../hooks/useFields';

const NewBookForm =({addBook})=>{

  const initData ={
title: '',
synopsys:'',
text_color:'#000000',
cover_color:'#ffffff',
theme:'',
  }

const[formData,handleChange,resetFormData] = useFields(initData);


const handleSubmit=(event)=>{
  event.preventDefault();
  addBook(formData);
  resetFormData();
}

return <form className="LoginForm"  onSubmit={handleSubmit}>
  <label>title<input type="text" name="title" value={formData.title} onChange={handleChange}/></label>
  <label>synopsys<input type="text" name="synopsys" value={formData.synopsys} onChange={handleChange}/></label>
  <label>Title text color<input type="color" name="text_color" value={formData.text_color} onChange={handleChange}/></label>
  <label>Cover color<input type="color" name="cover_color" value={formData.cover_color} onChange={handleChange}/></label>
  <label>Book theme<input type="text" name="theme" value={formData.theme} onChange={handleChange}/></label>
  <button type="submit" name="button">Write!</button>
</form>



}
export default NewBookForm;
//make it more visual by doing things on handleChange/ so don't use useFields
  //<label>Cover image<input type="file" name="image" value={formData.image} onChange={handleChange}/></label>
