const NotePage=({note,handleClick,deleteNote})=>{
  return <><div className='Character'>
  <h3>{note.title}</h3>
  <p>{note.text}</p>
  </div>
  <button type="button" onClick={handleClick} name="button">Edit Note</button>
  <button type="button" onClick={()=>deleteNote(note.id)} name="button">Delete note</button>
  </>
}
export default NotePage;
