import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles/RecipeCard.scss';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false,
            imgData: []
        }
    }

    componentDidMount() {
        this.fetchPhotos(this.props.recipe.title);
    }

    componentDidUpdate() {
        this.fetchPhotos(this.props.recipe.title);
    }

    mouseEnter = () => {
        this.setState({
            isHovering: true
        })
    }

    mouseLeave = () => {
        this.setState({
            isHovering: false
        })
    }

    handleRedirect = () => {
        const location = {
            pathname: '/recipe',
            state: {
                recipeDetails: this.props.recipe,
                imgDetails: this.state.imgData[0],
            }
        }
        this.props.history.push(location);
    }

    fetchPhotos(searchTerm) {
        let url = `https://api.unsplash.com/search/photos?query=${searchTerm}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Data: ', data);
            this.setState({
                imgData: data.results
            })
        })
        .catch(error => {
            console.log('Error: ', error);
        });
    }

    render() {       
        return(
            <div className='recipe_container' onClick={this.handleRedirect}>
                    {this.state.imgData.length > 0 && 
                        <div className='recipe_content'>
                            <img 
                                alt={this.state.imgData[0].alt_description}
                                src={this.state.imgData[0].urls.small} 
                                className='img_wrapper'
                                onMouseEnter={this.mouseEnter}
                                onMouseLeave={this.mouseLeave}
                            />  
                            {this.state.isHovering ?
                                <div className='content_description'>
                                    {this.props.recipe.description}  
                                </div>       
                                : null                      
                            }
                        </div>
                    }
                <div className='recipe_title'>
                    {this.props.recipe.title}
                </div>
            </div>
        );          
    }
  
}

export default withRouter(RecipeCard);