import React from 'react';
import RecipeList from '../recipe/RecipeList'
import Dropdown from './Dropdown';
import './styles/Home.scss';

const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Japanese', 'Korean', 'Mexican', 'Singaporean'];
const INGREDIENT_TYPE = ['Beef', 'Chicken', 'Dairy', 'Fish', 'Nuts', 'Pork', 'Seafood', 'Tofu', 'Vegetable'];


class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ...this.initalState,
        }
    }

    // returns default filter 
    get initalState()  {
        return {
            courseTitle: 'Select course',
            cuisineTitle: 'Select cuisine',
            ingredientTitle: 'Select ingredient',
            filterOn: false,
            filterQueryParams: {},
            recipes: [],
        };
    }

    // get all recipe on inital mount 
    componentDidMount() {
        this.fetchRecipe();
    }

    componentDidUpdate() {
        this.parseFilterQuery();
    }

    // parse query filter to match database 
    parseFilterQuery = () => {
        let {courseTitle, cuisineTitle, ingredientTitle, filterQueryParams} = this.state;
       
        if (courseTitle !== 'Select course') {
            filterQueryParams.course = courseTitle;
        } 
        if (cuisineTitle !== 'Select cuisine') {
            filterQueryParams.cuisine = cuisineTitle;
        } 
        if (ingredientTitle !== 'Select ingredient') {
            filterQueryParams.keywords = ingredientTitle;
        } 

        console.log(filterQueryParams);
    }

    // update filter states used as a call to update parent state
    filterHandler = (updatedTitle) => {
        // console.log(updatedTitle);
        if (updatedTitle.course !== '') {
            this.setState({
                courseTitle: updatedTitle.course
            });           
        } else if (updatedTitle.cuisine !== '') {
            this.setState({
                cuisineTitle: updatedTitle.cuisine
            });   
        } else if (updatedTitle.ingredient !== '') {
            this.setState({
                ingredientTitle: updatedTitle.ingredient
            });   
        } 
    }

    // reset filter state and load all recipies
    handleClearAll = () => {
        this.setState(
            this.initalState
        );
        this.fetchRecipe();
    }

    // send a get request from back end to return json obj of all recipe info
    fetchRecipe() {
        let url = 'http://localhost:9000/recipe/getAllRecipe';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            // parse json response
            .then(response => response.json())
            .then(data => {
                console.log('fetchRecipe Data: ', data);
                this.setState({
                    recipes: data
                });
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    };

    fetchFilteredRecipe = () => {
        let {filterQueryParams} = this.state;
        let url = new URL('http://localhost:9000/recipe/getRecipe')

        let params = new URLSearchParams(url.search.slice(1));

        for (const param in filterQueryParams) {
            params.append(`${param}`, `${filterQueryParams[param]}`);
        }

        console.log(url + '?' + params.toString())

        fetch(url + '?' + params.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            // parse json response
            .then(response => response.json())
            .then(data => {
                console.log('fetchFilteredRecipe Data: ', data);
                this.setState({
                    recipes: data
                });
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    }

    render(){
        const {courseTitle, cuisineTitle, ingredientTitle} = this.state;
        return(
            <div>
                <div className='filter_container'>
                    <label className='label_wrapper'>Filter by:</label>
                    <Dropdown 
                        title={courseTitle}
                        list={COURSES}
                        name='course'
                        filterHandler={this.filterHandler}
                    />
                    <Dropdown 
                        title={cuisineTitle}
                        list={CUISINES}
                        name='cuisine'
                        filterHandler={this.filterHandler}
                    />          
                    <Dropdown 
                        title={ingredientTitle}
                        list={INGREDIENT_TYPE}
                        name='ingredient'
                        filterHandler={this.filterHandler}
                    />      
                    <button
                        className='clear_button_wrapper'
                        onClick={this.fetchFilteredRecipe}
                    >Search</button>
                    <button
                        className='clear_button_wrapper'
                        onClick={this.handleClearAll}
                    >Clear All</button>   
                </div>   
                {
                    this.state.recipes.length === 0  ? 
                    <div
                        className="error_wrapper"
                    >Oh no looks we couldn't find any recipes that matchs your filters.</div> : 
                    <RecipeList recipes={this.state.recipes}/>
                }
            </div>
        );
    }
}

export default Home;