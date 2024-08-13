
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, Route, Switch } from 'react-router-dom';



const MealPlanItem = ({ mealPlan }) => (
  <div className="meal-plan-item">
    <h3>{mealPlan.title}</h3>
    <p>{mealPlan.description}</p>
    <Link to={`/mealplans/${mealPlan.id}`}>View Details</Link>
  </div>
);


const MealPlanList = () => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/mealplans')
      .then(response => setMealPlans(response.data))
      .catch(error => console.error('Error fetching meal plans:', error));
  }, []);

  return (
    <div className="meal-plan-list">
      {mealPlans.map(mealPlan => (
        <MealPlanItem key={mealPlan.id} mealPlan={mealPlan} />
      ))}
    </div>
  );
};


const MealPlanDetail = () => {
  const { id } = useParams();
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/mealplans/${id}`)
      .then(response => setMealPlan(response.data))
      .catch(error => console.error('Error fetching meal plan details:', error));
  }, [id]);

  if (!mealPlan) return <p>Loading...</p>;

  return (
    <div className="meal-plan-detail">
      <h2>{mealPlan.title}</h2>
      <p>{mealPlan.description}</p>
      {/* Add more details if needed */}
    </div>
  );
};


const MealPlanForm = () => {
  const [mealPlan, setMealPlan] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMealPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/mealplans', mealPlan)
      .then(response => {
        console.log('Meal plan added:', response.data);
        setMealPlan({
          title: '',
          description: ''
        });
      })
      .catch(error => console.error('Error adding meal plan:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="meal-plan-form">
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={mealPlan.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={mealPlan.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Meal Plan</button>
    </form>
  );
};


const MealPlan = () => (
  <div className="meal-plan-container">
    <Switch>
      <Route path="/mealplans/add" component={MealPlanForm} />
      <Route path="/mealplans/:id" component={MealPlanDetail} />
      <Route path="/mealplans" component={MealPlanList} />
    </Switch>
  </div>
);

export { MealPlan, MealPlanItem, MealPlanList, MealPlanDetail, MealPlanForm };
