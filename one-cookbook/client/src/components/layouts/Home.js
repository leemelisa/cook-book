import React from 'react';
import Filter from './Filter';

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Filter />
            </div>
        );
    }
}

export default Home;