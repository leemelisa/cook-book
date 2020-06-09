import React from 'react';
 
const RecipeDetail = props => {
    let recipeDetails = props.location.state.recipeDetails;
    return(
        <div>
            <h1>{recipeDetails.title}</h1>
            <div>{recipeDetails.course[0]}</div>
            <div>{recipeDetails.description}</div>
            <div>{recipeDetails.cuisine}</div>
            <div>{recipeDetails.serving_sizes}</div>
            <div>Ingredients
                {recipeDetails.ingredients.map(ingredient => {
                    return(
                        <div>
                            <span>
                                {ingredient.name}
                            </span>
                            <span>
                                {ingredient.measurement}
                            </span>  
                            <span>
                                {ingredient.unit}
                            </span>                      
                        </div>                    
                    );
                })}
            </div>
            <div>
                Instructions
                {recipeDetails.instructions.map(step => {
                    return(
                        <div>
                            {step.step[0]}
                        </div>
                    );
                })}
            </div>
            <div>
                Keywords:
                {recipeDetails.keywords.map(keyword => {
                    return(
                        <span>
                            {keyword.keyword}
                        </span>
                    );
                })}
            </div>
            <div>
                Notes:
                {recipeDetails.notes}
            </div>
        </div>
    );
}

export default RecipeDetail;