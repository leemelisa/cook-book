import React from 'react';
import RecipeCard from './RecipeCard';
import './styles/RecipeList.scss';

// map over recipelist from props to display recipe card 
const RecipeList = props => {
    
    return(
        <div className='recipe_list_container'>
            {
                props.recipes.map((recipe, idx) => {
                    return(
                        <RecipeCard 
                            key={idx}
                            recipe={recipe}
                        />
                    );
                })
            }
        </div>
    );
}

export default RecipeList;