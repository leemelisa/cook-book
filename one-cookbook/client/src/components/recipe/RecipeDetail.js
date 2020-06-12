import React from 'react';
import "./styles/RecipeDetail.scss";
 
const RecipeDetail = props => {
    let {recipeDetails, imgDetails} = props.location.state;
    return(
        <div>
            <img 
                // alt={props.location.state.imgData[0].alt_description}
                src={imgDetails.urls.regular} 
                className='img_wrapper'
            /> 
            <div className="recipe_detail_container">
                <h1
                    className='title_wrapper'
                >{recipeDetails.title}</h1>
                <div>
                    {recipeDetails.description}
                </div>
                <div className="recipe_details">
                    <div className='single_detail'>
                        <span>Course: </span>
                        <span>{recipeDetails.course[0]}</span>            
                    </div>
                    <div>
                        <span>Cuisine: </span>
                        <span>{recipeDetails.cuisine}</span>                    
                    </div>
                    <div>
                        <span>Serving Size: </span>
                        <span>{recipeDetails.serving_sizes}</span>                   
                    </div>
                    <div>
                        Keywords: 
                        {recipeDetails.keywords === undefined || recipeDetails.keywords.length === 0
                            ? null
                            : recipeDetails.keywords.map(keyword => {
                                return(
                                    <span> {keyword.keyword}</span>
                                );
                            })
                        }
                    </div>
                </div>
                <div>
                    <h2 className="recipe_subtitle">
                        Ingredients
                    </h2>
                    <ul className="ingredient_list">
                        {recipeDetails.ingredients.map(ingredient => {
                            return(
                                <li className='ingredient_item'>
                                    {`${ingredient.measurement} ${ingredient.unit} of ${ingredient.name}`} 
                                </li>                    
                            );
                        })}                        
                    </ul>

                </div>
                <div>
                    <h2 className="recipe_subtitle">
                        Instructions 
                    </h2>      
                    <ol>
                        {recipeDetails.instructions.map((step, idx) => {
                            return(
                                <li className="recipe_step">
                                    {step.step[0]}
                                </li>
                            );
                        })}                    
                    </ol>             

                </div>
                <div>
                    <h2 className="recipe_subtitle">
                        Notes:
                    </h2>
                    <div className="recipe_note">
                        {recipeDetails.notes === "" 
                            ? `Looks like the author didn't leave us a note`
                            : recipeDetails.notes
                        }                        
                    </div>                 
                </div>
            </div>

        </div>
    );
}

export default RecipeDetail;