import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './styles/Dropdown.scss';

class Dropdown extends React.Component{
    constructor(props) {
        super(props);

        this.state= {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title !== this.props.title) {
            this.setState({
                headerTitle: this.props.title
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    // hides course dropdown
    handleClickOutside = e => {
        if (!this.node.contains(e.target)) {
            this.setState({
                listOpen: false
            });
        }
    };

    // hide or show dropdown respectively
    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    // update headertitle and hide list
    onItemClick(item) {
        this.setState({
            headerTitle: item,
            listOpen: false
        })
    }

    render(){
        const { listOpen, headerTitle } = this.state;
        const { list, name } = this.props;
        return(
            <div ref={node => this.node = node} className='dropdown_wrapper'>
                <div 
                    className='header_wrapper' 
                    onClick={() => this.toggleList()}
                >
                    <div 
                        className='header_title'
                    >{headerTitle}</div>
                    {/* conditonal rendering if list is open arrow up else arrow down */}
                    {
                        listOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                    }                    
                </div>

                {  
                    listOpen && <ul className='list_wrapper'>
                    {
                        list.map(item => {
                            let courseVal = '', ingredientVal = '', cuisineVal = '';
                            if (name === 'course') {
                                courseVal = item;
                            } else if (name === 'ingredient') {
                                ingredientVal = item;
                            } else {
                                cuisineVal = item;
                            }
                           
                            let itemId = {
                                course: courseVal,
                                ingredient: ingredientVal,
                                cuisine: cuisineVal
                            };
                            return(
                                <li 
                                    className='item'
                                    key={item}
                                    onClick={(e)=> {
                                        this.onItemClick(item); 
                                        this.props.filterHandler(itemId) 
                                    }}
                                >{item}</li>
                            );  
                        })
                    }
                </ul>
                }      
            </div>
        );
    }
}

export default Dropdown;