import React, {Component} from 'react';
import {Toolbar} from 'react-md';
import './Header.css'

class Header extends Component{

    render(){

        return (
            <div className={"headerDiv"}>
            <Toolbar
                colored
                prominentTitle
                fixed={true}
                title={this.props.title}
                children={<img src={'https://d30y9cdsu7xlg0.cloudfront.net/png/414688-200.png'} alt={""} />}
                zDepth={3}
            />
            </div>
        );

    }

}

export default Header;