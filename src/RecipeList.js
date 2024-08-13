import React, { useEffect, useState } from "react";
import RecipeItem from "./RecipeItem";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.map(recipe => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
