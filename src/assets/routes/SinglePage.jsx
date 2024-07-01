// src/components/ShowPage.js
import React from 'react';

const ShowPage = ({ show, onBack }) => {
  return (
    <div className="show-page">
      <button onClick={onBack}>Back to Shows</button>
      <h2>{show.name}</h2>
      <img src={show.image ? show.image.medium : ''} alt={show.name} />
      <div dangerouslySetInnerHTML={{ __html: show.summary }}></div>
    </div>
  );
};

export default ShowPage;