
import React from 'react';
import './FilterOptions.css';

const FilterOptions = ({ categories, onFilter }) => {
  return (
    <div className="filter-options">
      <h3>Filter by Category</h3>
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOptions;
