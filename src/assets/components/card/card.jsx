// src/components/ShowCard.js
import React from 'react';

const ShowCard = ({ show, onShowMore }) => {
  return (
    <div className="card">
      <img src={show.image ? show.image.medium : ''} alt={show.name} />
      <h3>{show.name}</h3>
      <button onClick={() => onShowMore(show.id)}>Show More</button>
    </div>
  );
};

export default ShowCard;