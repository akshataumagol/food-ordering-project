
// SearchBar.jsx
import React, { useState } from 'react';
import "../../Styles/HomeStyle.css"; // Import CSS for styling

function SearchBar({ data }) {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Function to handle changes in the search input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter the data based on the search query
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      
      
      <ul className="search-results">
        {filteredData.map((item, index) => (
          <li key={index} className="search-item">
            <div>
              <img src={item.image} alt={item.name} className="search-item-image" />
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
