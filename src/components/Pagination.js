import React, { useState } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) {
  const [error, setError]=useState('')
  const handleErr=(val)=>{
    setError(val);
  }
  return (
    <div className="pagination">
      <input
        type="number"
        min="1"
        max="10"
        defaultValue={5}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 1 && value <= 10) {
            setError('')
            onItemsPerPageChange(value);
          } else {
            handleErr('Please enter number between 1 to 10');
          }
        }}
      />
      {error}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;