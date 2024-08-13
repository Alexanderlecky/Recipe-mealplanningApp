// src/CategoryComponents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, Route, Switch } from 'react-router-dom';


// CategoryItem Component
const CategoryItem = ({ category }) => (
  <div className="category-item">
    <h3>{category.strCategory}</h3>
    <p>{category.strCategoryDescription}</p>
    <Link to={`/categories/${category.idCategory}`}>View Details</Link>
  </div>
);

// CategoryList Component
const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="category-list">
      {categories.map(category => (
        <CategoryItem key={category.idCategory} category={category} />
      ))}
    </div>
  );
};

// CategoryDetail Component
const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/categories/${id}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category details:', error));
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="category-detail">
      <h2>{category.strCategory}</h2>
      <p>{category.strCategoryDescription}</p>
      {/* Add more details if needed */}
    </div>
  );
};

// CategoryForm Component
const CategoryForm = () => {
  const [category, setCategory] = useState({
    strCategory: '',
    strCategoryDescription: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/categories', category)
      .then(response => {
        console.log('Category added:', response.data);
        setCategory({
          strCategory: '',
          strCategoryDescription: ''
        });
      })
      .catch(error => console.error('Error adding category:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <label>
        Category Name:
        <input
          type="text"
          name="strCategory"
          value={category.strCategory}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="strCategoryDescription"
          value={category.strCategoryDescription}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
};

// Consolidated Category Component
const Category = () => (
  <div className="category-container">
    <Switch>
      <Route path="/categories/add" component={CategoryForm} />
      <Route path="/categories/:id" component={CategoryDetail} />
      <Route path="/categories" component={CategoryList} />
    </Switch>
  </div>
);

export { Category, CategoryItem, CategoryList, CategoryDetail, CategoryForm };
