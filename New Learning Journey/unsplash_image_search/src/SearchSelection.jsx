import {Form} from 'react-bootstrap';
import  {useRef,useState,useEffect}from 'react';
import fetchImages from './App';
//import resetSearch from './App'


const SearchSelction=()=>{
    const [page, setPage]=useState(1);
    const searchInput = useRef(null);
    const handleSelection =(selection)=>{
        searchInput.current.value = selection;
        fetchImages();
        setPage(1);
        resetSearch()
        console.log('page',page)
      }
      const handleSearch =(event)=>{
        event.preventDefault();
        console.log(searchInput.current.value)
        fetchImages();
        //setImages(1);
        resetSearch();
      }
      const resetSearch=()=>{
        setPage(1);
        fetchImages()
      }
      useEffect(()=>{
        fetchImages();
      },[]);
return(
<>
<div className='search-section'>
<Form onSubmit={handleSearch}>
  <Form.Control
  type='search'
  placeholder='Type something to search...'
  className='search-input' 
  ref={searchInput}/>
</Form>
</div>
  <div className='filters'>

    <div onClick={()=>handleSelection('nature')}>Nature</div>
    <div onClick={()=>handleSelection('birds')}>Birds</div>
    <div onClick={()=>handleSelection('cats')}>Cats</div>
    <div onClick={()=>handleSelection('shoes')}>Shoes</div>
  </div>
  </>
)
}
export default SearchSelction;