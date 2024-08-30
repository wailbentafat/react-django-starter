import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function Search() {
    const[query,setQuery]=useState('');
    const[results,setResults]=useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(null);
    const navigate=useNavigate();
    
    const handlesearch = (event) => {
        console.log('Handling search event');
        event.preventDefault();
        setLoading(true);
        console.log('Sending search request to server');
        axios.post('http://localhost:8002/search/', { query },{ withCredentials: true })
            .then((response) => {
                console.log('Search response from server:', response);
                setResults(response.data);
            })
            .catch((error) => {
                console.error('Search request error:', error);
                setError(error);
            })
            .finally(() => {
                console.log('Search request finished');
                setLoading(false);
            });
    };

    const handleclick=(userid)=>{
      console.log(`Handling click event on user ${userid}`);
      console.log('Navigating to profile page');
      navigate(`/profile/${userid}`);
      console.log('Finished navigating');
       
    }
    return (
        
        <div className="searchpage">
            <div className="searchbar">
                <form onSubmit={handleSearch} className='search'>
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit" className='search btn'>Search</button>
                </form>
            </div>
            <div className="results">
                {loading ? (
                    <p>Loading...</p> 
                ) : (
                    results.map((result) => (
                        <div className="result" key={result.id} onClick={() => handleClick(result.id)}>
                            <p>{result.name}</p>
                        </div>
                    ))
                )}
                {error && <p>Error: {error.message}</p>}  
            </div>
        </div>
    );
}



export default Search