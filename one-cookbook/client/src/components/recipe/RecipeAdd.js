import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './styles/RecipeAdd.scss';
import headerImg from './styles/coverImg.jpg';


const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Koean', 'Japanese', 'Singaporean'];

class RecipeAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            course: 'Breakfast',
            cuisine: 'American',
            servingSize: 1,
            ingredients: '',
            instructions: '',
            notes: '',
        };
    }

    // update state for controlled elements: name, description, notes
    handleInputChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        // console.log(`${e.target.name}: ${e.target.value}`)
    }

    handleOnSubmit = e => {
        let data = {
            title: this.state.name,
            description: this.state.description,
            course: this.state.course,
            serving_sizes: this.state.servingSize,
            cuisine: this.state.cuisine,
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

    handleOnAdd = () => {
        return(
            <div>
                hi
            </div>
        );
    }

    render() {
        return(
            <div>
                <img src={headerImg} alt='headerLogo' className='fixed_picture' />
                <form className='form_container' >
                    <h1>Add a Recipe</h1>
                    <label>
                        Name:
                        <input 
                            type='text' 
                            name='name' 
                            value = {this.state.name}
                            onChange={ e => this.handleInputChange(e)}
                            className='input_wrapper'
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea 
                            type='text' 
                            name='description'
                            value={this.state.description}
                            onChange={ e => this.handleInputChange(e)}
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
                            onChange={ e => this.handleInputChange(e)}
                            required
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
                            onChange={ e => this.handleInputChange(e)}
                            required
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
                        <input 
                            type='text' 
                            name='ngredients' 
                            // onChange={ e => this.handleInputChange(e)}
                            className='input_wrapper'
                            // required
                        />                        
                    </label>
                    <label>
                        Serving Size:
                        <input 
                            type='number' 
                            name='servingSize'
                            min='1'
                            max='10'
                            onChange={ e => this.handleInputChange(e)}
                            className='input_wrapper'
                            required
                        />
                    </label>
                    <label>
                        Instructions:
                        <div className='instruction_container'>
                            1.
                            <input 
                                type='text' 
                                name='instructions' 
                                onChange={ e => this.handleInputChange(e)}
                                className='instruction_input_wrapper'
                                required
                            />
                            <AddCircleIcon 
                                onClick={ this.handleOnAdd() }
                                color='primary'
                            />                            
                        </div>

                    </label>

                    <label>
                        Notes:
                        <textarea 
                            type='text' 
                            name='notes' 
                            value={this.state.notes}
                            onChange={ e => this.handleInputChange(e) }
                            className='input_wrapper'
                        />
                    </label>
                    <input
                        type='submit'
                        value='Submit'
                        className='submit_wrapper'
                        onClick={ e => this.handleOnSubmit(e) }
                    />
                </form>                
            </div>
        );
    }
}

export default RecipeAdd;