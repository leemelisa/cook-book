import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './styles/RecipeAdd.scss';
import headerImg from './styles/coverImg.jpg';


const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Koean', 'Japanese', 'Singaporean'];
const UNITS = ['cup', 'oz', 'tbsp', 'tsp', 'mL', 'L', 'g'];

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
            notes: '',
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
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            });            
        }

        console.log(`${e.target.name}: ${e.target.value}`)
    }

    // add a new blank instruction to array cause auto reloading
    addStep = (e) => {
        this.setState((prevState) => ({
            instructions: [...prevState.instructions, {step: ''}]
        }));
        
        console.log(this.state.instructions)
    }

    // add new blank ingredient to ingredient arry to trigger reload to add new input 
    addIngredient = e => {
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, {
                name: '', 
                measurement: 0, 
                unit: 'cup'
            }]
        }));
    }

    handleOnSubmit = e => {
        let data = {
            title: this.state.title,
            description: this.state.description,
            course: this.state.course,
            serving_sizes: this.state.servingSize,
            cuisine: this.state.cuisine,
            ingredients: this.state.ingredients,
            instruction: this.state.instructions,
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
                <form className='form_container'onSubmit={ e => this.handleOnSubmit(e)} onChange={ e => this.handleInputChange(e)}>
                    <h1>Add a Recipe</h1>
                    <label>
                        Name:
                        <input 
                            type='text' 
                            name='title' 
                            value = {this.state.name}
                            className='input_wrapper'
                            // required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea 
                            type='text' 
                            name='description'
                            value={this.state.description}
                            className='input_wrapper'
                            // required
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
                        Cuisine
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
                            <button onClick={this.addIngredient}>Add ingredient</button>
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
                                onClick={ this.addStep }
                            >Add another step </button>                  
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