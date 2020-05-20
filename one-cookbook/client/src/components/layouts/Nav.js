import React from 'react';
import { NavLink, withRouter, Router } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import './styles/Nav.scss';


class Nav extends React.Component {
    render() {
        return(
            <div>
                <ReactTooltip place='bottom' />
                <ul>
                    <li className='logo'>
                        <NavLink exact to='/'>
                            One Cookbook
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/favorite'>
                            Favs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/shoppinglist'>
                            Shopping List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/recipe/add'>
                            Add Recipes
                        </NavLink>
                    </li>                    
                    <li>
                        <NavLink exact to='/recipe'>
                            Recipes
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Nav;