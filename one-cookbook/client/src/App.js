import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeAdd from './components/recipe/RecipeAdd';
import Favorite from './components/favorite/Favorite';
import ShoppingList from './components/shoppingList/ShoppingList';
import Home from './components/layouts/Home';
import Nav from './components/layouts/Nav';

function App() {
  return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/recipe' exact>
					<RecipeDetail />
				</Route>
				<Route path='/recipe/add' exact>
					<RecipeAdd />
				</Route>
				<Route path='/favorite' exact> 
					<Favorite />
				</Route>
				<Route path='/shoppinglist' exact>
					<ShoppingList />
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
