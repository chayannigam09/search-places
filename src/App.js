import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import { fetchCities } from './api';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCities(query, itemsPerPage);
        setData(response.data);
        setTotalPages(Math.ceil(response.metadata.totalCount / itemsPerPage));
      } catch (error) {
        setError('Failed to fetch data');
      }
      setIsLoading(false);
    };

    if (query) {
      fetchData();
    }
  }, [query, itemsPerPage, currentPage]);

  return (
    <div className="app">
      <SearchBox onSearch={setQuery} />
      <Table data={data} isLoading={isLoading} error={error} />
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}

export default App;