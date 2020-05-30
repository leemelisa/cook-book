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
                <div>
                    Recipe filter content
                </div>
            </div>
        );
    }
}

export default Home;