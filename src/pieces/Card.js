import '../css/Card.css';
const Card =({title,texts,handleClick,prop})=>{

return <div className='Card' onClick={()=>handleClick(prop)}>
{title? <h3>{title}</h3>:null}
{texts? texts.map(text => <p>{text}</p>):null}
</div>

}
export default Card;
