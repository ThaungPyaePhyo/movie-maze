import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {

  const [movieData, setMovieData] = useState(null);
  const [isMovieSelected, setIsMovieSelected] = useState(false);

  const getFetchData = async (imdbID) => {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          i: imdbID,
          apikey: '7e0f2788',
          type: 'movie',
        }
      });

      setMovieData(response.data)
      setIsMovieSelected(true);
    } catch (error) {
      console.error('error')
    }
  }

  const resultHandler = (imdbID) => {
    getFetchData(imdbID);
  };


  useEffect(() => {
    getFetchData('tt3896198');
  }, [])

  const [searchData, setSearchData] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const fetchData = async (newSearchData) => {
    try {
      const searchResponse = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: '7e0f2788',
          type: 'movie',
          s: newSearchData
        }
      });
      setSearchResult(searchResponse.data);
      setIsMovieSelected(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const search = (e) => {
    const newSearchData = e.target.value;
    setSearchData(newSearchData);
    fetchData(newSearchData);
  };

  function SearchResults({ results }) {
    if (results && !isMovieSelected) {
      if (results.Response == "True") {
        const data = results.Search
        return (
          <ul className="bg-gray-800 absolute w-4/5 md:w-2/3 lg:w-1/4 rounded-lg overflow-auto z-10 top-60">
            {data.map((result) => (
              <li key={result.imdbID} className="p-2 border border-gray-900 cursor-pointer" onClick={() => resultHandler(result.imdbID)}>
                <div className="flex items-center px-4 gap-4 content-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-lg" src={result.Poster} alt={`${result.Title} Poster`} />
                  </div>
                  <div className="flex-1 min-w-0 content-center items-center text-white">
                    <p className="text-lg font-bold">{result.Title}</p>
                    <p className="text-sm">{result.Year}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );
      } else {
        console.log('hi');
      }
    } else {
      return null;
    }

  }

  return (
    <>
      <div className='container-2xl'>
        <nav className=' h-20 flex items-center p-5 md:mx-40'>
          <h1 className="text-yellow-500 font-serif font-bold text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">MOVIE MAZE</h1>

        </nav>
        <div className="flex justify-center items-center bg-gray-800 py-8 px-2 md:p-16 m-4">
          <input
            type="text"
            className="bg-white h-14 w-4/5 md:w-1/2 xl:w-1/3 px-12 rounded-lg"
            placeholder="Type your response here..."
            onChange={search}
          />
        </div>
        <div className='flex justify-center items-center'>
          <SearchResults results={searchResult} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center mx-4 lg:mx-0 2xl:mx-40 2xl:px-40 my-16 xl:my-20">
          <div className='md:mb-0 mb-12'>
            <img src={movieData?.Poster} alt="" className='rounded-lg object-cover' />
          </div>
          <div className='text-white grid gap-3 md:gap-6 sm:mx-40 md:mx-0 my-2'>
            <h1 className='text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-yellow-500 font-bold'>{movieData?.Title}</h1>
            <h3 className='text-sm sm:text-md md:text-md font-bold'>
              Year: {movieData?.Year ?? 'N/A'},&nbsp;&nbsp;
              <span className='bg-yellow-500 text-white p-1 rounded'>Rating: {movieData?.Rated},</span>&nbsp;&nbsp;
              Released: {movieData?.Released}
            </h3>
            <h2><span className='bg-gray-700 text-white md:text-lg text-sm sm:text-md p-1 rounded'><b>Genre:</b>&nbsp;&nbsp;{movieData?.Genre}</span></h2>
            <h2 className='text-white md:text-lg text-sm sm:text-md'><b>Writer:</b>&nbsp;&nbsp;{movieData?.Writer}</h2>
            <h2 className='text-white md:text-lg text-sm sm:text-md'><b>Actors:</b>&nbsp;&nbsp;{movieData?.Actors}</h2>
            <h2 className='text-white md:text-lg text-sm sm:text-md'><b>Plot:</b>&nbsp;&nbsp;{movieData?.Plot}</h2>
            <h2 className='text-yellow-500 md:text-lg text-sm sm:text-md'><b>Language:</b>&nbsp;&nbsp;{movieData?.Language}</h2>
            <p className='text-sm sm:text-md md:text-lg'>{movieData?.Awards}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
