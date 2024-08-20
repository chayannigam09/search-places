import React from 'react';
import './Table.css';

function Table({ data, isLoading, error }) {
  if (isLoading) return <div><span class="loader"></span></div>;
  if (error) return <div>Error loading data.</div>;

  if (!data.length) return <div>No result found</div>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((place, index) => (
            <tr key={place.id}>
              <td>{index + 1}</td>
              <td>{place.city}</td>
              <td>
                <img
                  src={`https://flagsapi.com/${place.countryCode}/flat/32.png`}
                  alt={place.country}
                />{' '}
                {place.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;