import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) {
  const [error, setError] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleErr = (val) => {
    setError(val);
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (itemsPerPage >= 1 && itemsPerPage <= 10) {
      const timeout = setTimeout(() => {
        setError('');
        onItemsPerPageChange(itemsPerPage);
      }, 100); 

      setDebounceTimeout(timeout);
    } else {
      handleErr('Please enter a number between 1 and 10');
    }

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [itemsPerPage]);

  return (
    <div className="pagination">
      <input
        type="number"
        min="1"
        max="10"
        defaultValue={3}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      />
      {error && <div className="error">{error}</div>}
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
