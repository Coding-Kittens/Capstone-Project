const AddImageForm =()=>{

const imageInput = useRef();



  return <form class="AddImageForm" action="index.html" method="post" >
    <input type="file" name="image"/>
    <button type="submit" name="button" ref={imageInput} >Upload Image</button>
  </form>
}

export default AddImageForm;
