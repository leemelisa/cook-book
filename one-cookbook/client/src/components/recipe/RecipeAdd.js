import React from 'react';
import './styles/RecipeAdd.scss';
import headerImg from './styles/pasta.jpg';

const COURSES = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Side Dish'];
const CUISINES = ['American', 'Chinese', 'French', 'Koean', 'Japanese', 'Singaporean'];

class RecipeAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            instructions: [],
            notes: '',
        };
    }

    // update state for controlled elements: name, description, notes
    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
            <div>
                <img src={headerImg} alt='headerLogo' className='fixed_picture' />
                <form className='form_container'>
                    <h1>Add a Recipe</h1>
                    <label>
                        Name:
                        <input 
                            type='text' 
                            name='name' 
                            value = {this.state.name}
                            onChange={ e => this.handleChange(e)}
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
                            onChange={ e => this.handleChange(e)}
                            className='input_wrapper'
                            required
                        />
                    </label>
                    <label>
                        Course:
                        <select 
                            className='select_wrapper'
                        >
                            {COURSES.map(course => {
                                return (
                                    <option
                                        value={course}
                                >{course}</option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Cuisine
                        <select
                            className='select_wrapper'
                        >
                            {CUISINES.map(cuisine => {
                                return (
                                    <option 
                                        value={cuisine}
                                    >{cuisine}</option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Serving Size:
                        <input 
                            type='number' 
                            min='1'
                            max='10'
                            className='input_wrapper'
                            required
                        />
                    </label>
                    <label>
                        Instructions:
                        <input 
                            type='text' 
                            name='instructions' 
                            className='input_wrapper'
                            required
                        />
                    </label>
                    <label>
                        Notes:
                        <textarea 
                            type='text' 
                            name='notes' 
                            value={this.state.notes}
                            onChange={ e => this.handleChange(e) }
                            className='input_wrapper'
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