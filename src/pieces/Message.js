const Message=({text,color,handleClick})=>{
  return <div style={{backgroundColor:color}} className='Message'><h3>{text}</h3> <button type="button" name="button" onClick={handleClick}>X</button> </div>
}
export default Message;
