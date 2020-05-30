import React from 'react';
import './styles/RecipeAdd.scss';
import headerImg from './styles/coverImg.jpg';


const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Korean', 'Japanese', 'Singaporean'];
const UNITS = ['cup', 'oz', 'tbsp', 'tsp', 'mL', 'L', 'g'];
const KEYWORDS = ['Beef', 'Chicken', 'Fish', 'Pork', 'Seafood', 'Tofu', 'Vegetable'];

class RecipeAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            course: 'Breakfast',
            cuisine: 'American',
            servingSize: 1,
            ingredients: [{
                name: '', 
                measurement: 0, 
                unit: 'cup'
            }],
            instructions: [{step: ''}],
            keywordSet: new Set(),
            notes: ''
        };
    }

    // update state for controlled elements: name, description, notes
    handleInputChange = e => {
        if (['step'].includes(e.target.name)) {
            let instructions = [...this.state.instructions];
            instructions[e.target.dataset.id][e.target.name] = e.target.value;
            this.setState({ instructions })
        } else if (['name', 'measurement', 'unit'].includes(e.target.name)) {   
            let ingredients = [...this.state.ingredients];
            ingredients[e.target.dataset.id][e.target.name] = e.target.value;
            this.setState({ ingredients })
        } else if (e.target.type === 'checkbox') {
            this.handleKeywordChange(e);                 
        } else  {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            });            
        }
    }

    // add a empty default value to instruction/ingredients array cause auto reloading to 
    // add new input to page
    addNewInput = e => {
        if (e.target.name === 'addStep') {
            
            this.setState((prevState) => ({
                instructions: [...prevState.instructions, {step: ''}]
            }));            
        } else {
            this.setState((prevState) => ({
                ingredients: [...prevState.ingredients, {
                    name: '', 
                    measurement: 0, 
                    unit: 'cup'
                }]
            }));            
        }

        e.preventDefault();
    }

    // update what keywords are checked
    handleKeywordChange = e => {
        let {keywordSet} = this.state;
        let item = e.target.name;
       
        // keyword isnt found set as true
        if (!keywordSet.has(item)) {
            this.setState((prev) => ({
                keywordSet: keywordSet.add(item)
            }));
        } else {
            // item is click again remove from map
            keywordSet.delete(item);
            this.setState({
                keywordSet
            })
        }
    }

    handleOnSubmit = e => {    
        let parseKeyword = [];
        // parse keyword to match db
        this.state.keywordSet.forEach((word) => {
            parseKeyword.push({keyword: word })
        })

        let data = {
            title: this.state.title,
            description: this.state.description,
            course: this.state.course,
            cuisine: this.state.cuisine,
            serving_sizes: this.state.servingSize,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            keywords: parseKeyword,
            notes: this.state.notes
        }
        console.log(data);

        fetch('http://localhost:9000/recipe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Sucess: ', response.json());
            })
            .catch(error => {
                console.log('Error: ', error);
            })
        e.preventDefault();
    }

    render() {
        let { instructions, ingredients } = this.state;
        return(
            <div>
                <img src={headerImg} alt='headerLogo' className='fixed_picture' />
                <form className='form_container' onSubmit={ e => this.handleOnSubmit(e)} onChange={ e => this.handleInputChange(e)}>
                    <h1>Add a Recipe</h1>
                    <label>
                        Name:
                        <input 
                            type='text' 
                            name='title' 
                            value = {this.state.name}
                            className='input_wrapper'
                            placeholder='Recipe Name'
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea 
                            type='text' 
                            name='description'
                            value={this.state.description}
                            className='input_wrapper'
                            required
                            placeholder='Give a short description about your recipe!'
                        />
                    </label>
                    <label>
                        Course:
                        <select 
                            name='course'
                            className='select_wrapper'
                            value={this.state.course}
                            // required
                        >
                            {COURSES.map(course => {
                                return (
                                    <option
                                        key={course}
                                        value={course}
                                >{course}</option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Cuisine:
                        <select
                            name='cuisine'
                            className='select_wrapper'
                            value={this.state.cuisine}
                            // required
                        >
                        {CUISINES.map(cuisine => {
                            return (
                                <option 
                                    key={cuisine}
                                    value={cuisine}
                                >{cuisine}</option>
                            );
                        })}
                        </select>
                    </label>
                    <label>
                        Ingredients:
                        <div className='ingredient_container'>
                            {ingredients.map((val, idx) => {
                                    return (
                                        <div key={`ingredient ${idx}` } className='input_container'>
                                            <input 
                                                type='text' 
                                                name='name'
                                                data-id={idx}
                                                placeholder="Name"
                                                className='input_wrapper'
                                            />                        
                                            <input 
                                                type='number'
                                                name='measurement'
                                                step='any'
                                                data-id={idx}
                                                placeholder='Measurement'
                                                className='input_wrapper'
                                            />
                                            <select 
                                                name='unit'
                                                data-id={idx}
                                                className='select_wrapper'
                                            >
                                            {UNITS.map(unit => {
                                                return (
                                                    <option
                                                        key={unit}
                                                        value={unit}
                                                        min='1'
                                                        className='select_wrapper'
                                                    >{unit}</option>
                                                )
                                            })}
                                            </select>                               
                                        </div>
                                    );
                            })}
                            <button 
                                name='addIngredient'
                            >Add ingredient</button>
                        </div>
                    </label>
                    <label>
                        Serving Size:
                        <input 
                            type='number' 
                            name='servingSize'
                            min='1'
                            max='10'
                            className='input_wrapper'
                            // required
                        />
                    </label>
                    <label>
                        Instructions:
                        <div className='instruction_container'>
                            {
                                instructions.map((val, idx) => {
                                    let stepPlaceholder = `Step ${idx + 1}`;
                                    return(
                                        <div key={`step ${idx}`} className='input_container'>
                                            <input 
                                                type='text'
                                                name='step'
                                                data-id={idx}
                                                className='input_wrapper'
                                                placeholder={stepPlaceholder}
                                            />
                                        </div>
                                    );
                                })
                            }     
                            <button 
                                name='addStep'
                                onClick={ this.addNewInput }
                            >Add another step </button>                  
                        </div>
                    </label>
                    <label>
                        Keywords: 
                        <div className='keyword_container'>
                            {
                                KEYWORDS.map(keyword => {
                                    return(
                                        <span>
                                            <input 
                                                type='checkbox' 
                                                id={keyword} 
                                                name={keyword}
                                                value={keyword}
                                            />
                                            <label>{keyword}</label>
                                        </span>
                                    )
                                })
                            }                            
                        </div>
                    </label>
                    <label>
                        Notes:
                        <textarea 
                            type='text' 
                            name='notes' 
                            value={this.state.notes}
                            className='input_wrapper'
                            placeholder='Write a note to potential viewers'
                        />
                    </label>
                    <input
                        type='submit'
                        value='Submit'
                        className='submit_wrapper'
                    />
                </form>                
            </div>
        );
    }
}

export default RecipeAdd;