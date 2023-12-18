import React from 'react';
import '../styles/Loader.scss'; // Include your loader styles here

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="modal-background" />
      <div className="loader">
        <div className="spinner"/>
      </div>
    </div>
  );
};

export default Loader;
