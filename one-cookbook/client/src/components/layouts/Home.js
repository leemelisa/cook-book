import React from 'react';
import Filter from './Filter';
import RecipeList from '../recipe/RecipeList'

class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            filterOn: false,
            recipes: [],
        }
    }

    componentDidMount() {
        this.fetchRecipe();
    }

    // send a get request frm back end to return json obj of all recipe info
    fetchRecipe() {
        let url = 'http://localhost:9000/recipe/get';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            // parse json response
            .then(response => response.json())
            .then(data => {
                console.log('Data: ', data);
                this.setState({
                    recipes: data
                });
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    };

    render(){
        return(
            <div>
                <Filter />
                <RecipeList recipes={this.state.recipes}/>
            </div>
        );
    }
}

export default Home;