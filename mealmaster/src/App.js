
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MealPlan } from './MealPlan';
import Category from './Category';
import NavBar from './NavBar'; 

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/categories" component={Category} />
          <Route path="/mealplans" component={MealPlan} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
