import React, { useEffect, useState } from "react";

const Recipe = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the categories from the local JSON file
    fetch('http://localhost:8000/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching the data", error);
      });
  }, []);

  return (
    <div className="recipe-container">
      <h1>Recipe Categories</h1>
      <div className="categories">
        {categories.map(category => (
          <div key={category.idCategory} className="category">
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h2>{category.strCategory}</h2>
            <p>{category.strCategoryDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
