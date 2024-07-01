import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCard from './assets/components/card/card';
import ShowPage from './assets/routes/SinglePage';
import './App.css';

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShows();
  }, [currentPage]);

  const fetchShows = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/shows?page=${currentPage - 1}`)
      .then(response => {
        setShows(prevShows => [...prevShows, ...response.data]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  };

  const handleShowMore = (id) => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => setSelectedShow(response.data))
      .catch(error => console.error('Error fetching show:', error));
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  return (
    <div className="container">
      <h1>TV Shows</h1>
      {selectedShow ? (
        <ShowPage show={selectedShow} onBack={handleBack} />
      ) : (
        <>
          <div className="shows-container">
            {shows.map((show, index) => (
              <ShowCard
                key={`${show.id}-${index}-${currentPage}`} // Ensure unique keys
                show={show}
                onShowMore={handleShowMore}
              />
            ))}
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button className="load-more" onClick={handleLoadMore}>Show More</button>
          )}
        </>
      )}
    </div>
  );
};

export default App;