const ImageBtn =({image,handleClick,nameClass='ImageBtn'})=>{
return <img className ={nameClass} src={image} alt="image" onClick={handleClick}/>
}
export default ImageBtn;
