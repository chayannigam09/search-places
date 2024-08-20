import React, { useState, useEffect } from 'react';
import './SearchBox.css';

function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => setQuery(e.target.value);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch(query);
    };

    useEffect(() => {
        const handleShortcut = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                document.getElementById('search-input').focus();
            }
        };
        window.addEventListener('keydown', handleShortcut);
        return () => window.removeEventListener('keydown', handleShortcut);
    }, []);

    return (
        <div className="search-container">
            <input
                id="search-input"
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search places..."
                className="search-box"
            />

            <div className="search-placeholder">
                <span className="shortcut-hint">Ctrl + /</span>
            </div>
        </div>
    );
}

export default SearchBox;
