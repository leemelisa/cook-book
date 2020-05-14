import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeAdd from './components/recipe/RecipeAdd';
import Favorite from './components/favorite/Favorite';
import ShoppingList from './components/shoppingList/ShoppingList';
import Home from './components/layouts/Home';
import Nav from './components/layouts/Nav';
import NotFound from './components/pages/NotFound';

function App() {
  return (
		<BrowserRouter>
			<Nav />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/recipe' exact component={RecipeDetail} />
				<Route path='/recipe/add' exact component={RecipeAdd} />
				<Route path='/favorite' exact component={Favorite} /> 
				<Route path='/shoppinglist' exact component={ShoppingList} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
