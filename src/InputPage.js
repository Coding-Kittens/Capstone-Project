import useFields from './hooks/useFields';

const InputPage =({pageNum,changePage,text=''})=>{


const[page,handleChange,resetpage] = useFields(text);


return <div className ='InputPage'>
<textarea name="page" rows="8" cols="80" value={page} onChange={handleChange}></textarea>
<div className ='ChangePage' onClick ={changePage}></div>
</div>
}
export default InputPage;
