import logo from './logo.svg';
import React, {useRef, useState, useCallback} from "react";
import './App.css';
import useBookSearch from "./UseBookSearch";

function App() {
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState('')
    const {books, error, hasMore, loading} = useBookSearch(query, pageNumber)
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                // console.log('Visible')
                setPageNumber(prevPageNumber=>prevPageNumber+1)
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])
    const handleSearch = (e)=>{
        setQuery(e.target.value)
        setPageNumber()
    }
  return (
      <>
        <input type="text" value={query} onChange={handleSearch}/>
          {books.map((book, index) => {
              if(books.length === index + 1){
                  return <div ref={lastBookElementRef} key={book}>{book}</div>
              } else {
                  return <div key={book}>{book}</div>
              }
          })}
          <div>{loading && 'Loading ...'}</div>
          <div>{error && 'Error'}</div>
      </>
  );
}

export default App;
