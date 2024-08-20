import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange, onItemsPerPageChange }) {
    const [error, setError] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
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
            <div className='pagination-item'>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span className='per-page'>Page {currentPage} of {totalPages}</span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <div className='pagination-input'>
                <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={5}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className='input-pagenumber'
                />
                <span className='error-msg'>{error}</span>
            </div>
        </div>
    );
}

export default Pagination;
