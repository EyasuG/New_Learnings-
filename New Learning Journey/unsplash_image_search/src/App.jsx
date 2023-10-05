import React,{ useState,useRef, useEffect,useCallback } from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Title from './Title';

function App() {
const [images, setImages]= useState([]);
const [totalPages, setTotalPages]=useState(0);
const [page, setPage]=useState(1);
//to indicate loading 
const [loading,setLoading] = useState(false);

  const searchInput = useRef(null);
  const IMAGES_PER_PAGE = 20;
  const API_URL= 'https://api.unsplash.com/search/photos'
  
  const resetSearch=()=>{
    setPage(1);
    fetchImages()
  }

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
  const fetchImages = useCallback(async()=>{
    try{
      if(searchInput.current.value){
      const {data} =  await axios.get(
        `${API_URL}?query=${
          searchInput.current.value 
        } &page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      )
      console.log('data', data);
      setImages(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
      }
    } catch(error){
      console.log(error);
      setLoading(false);
    }
  },[page])
  
  useEffect(()=>{
    fetchImages();
  },[fetchImages]);
 return(

<div className='container'>
  <Title/>
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
  {loading ?(
    <p className='loading'>Loading...</p>
  ):(
  <div className= 'images'>
    {images.map((image)=>{
      return (
        <img 
        key={image.id}
        src={image.urls.small}
        alt={image.alt_description}
        className='image'
        />
      )
    })}
  
  </div >
)}
  <div className='buttons'>
    {page > 1 && (<Button onClick={()=>setPage(page-1)}>Previous</Button>)}
    {page < totalPages && (<Button onClick={()=>setPage(page+1)} >Next</Button>)}
  </div>
  </div>
  
 )
  }

export default App
