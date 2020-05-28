import React from 'react';
import './styles/Filter.scss';
import Dropdown from './Dropdown';

const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Korean', 'Japanese', 'Singaporean'];
const INGREDIENT_TYPE = ['Beef', 'Chicken', 'Fish', 'Pork', 'Seafood', 'Tofu', 'Vegetable'];

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.initalState
        }

        this.filterHandler = this.filterHandler.bind(this);
    }

    get initalState()  {
        return {
            courseTitle: 'Select course',
            cuisineTitle: 'Select cuisne',
            ingredientTitle: 'Select ingredient'
        };
    }

    filterHandler(updatedTitle) {
        console.log(updatedTitle);
        if (updatedTitle.course != '') {
            this.setState({
                courseTitle: updatedTitle.course
            });           
        } else if (updatedTitle.cuisine != '') {
            this.setState({
                cuisineTitle: updatedTitle.cuisine
            });   
        } else if (updatedTitle.ingredient != '') {
            this.setState({
                ingredientTitle: updatedTitle.ingredient
            });   
        } 


    }

    handleClearAll = () => {
        this.setState(
            this.initalState
        );
    }

    render() {
        const {courseTitle, cuisineTitle, ingredientTitle} = this.state;
        return(
            <div>
                <div className='filter_container'>
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
                </div>        
                <button
                    onClick={this.handleClearAll}
                >Clear All</button>       
            </div>
        );
    }
}

export default Filter;