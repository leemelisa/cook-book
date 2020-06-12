import React from 'react';
import { NavLink } from 'react-router-dom';
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
                    <li className="g_button">
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
                </ul>
            </div>
        );
    }
}

export default Nav;