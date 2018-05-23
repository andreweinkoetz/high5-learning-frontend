import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {

        return (
            <section>
                <Header title={this.state.title}/>
                {this.props.children}

                <Footer/>

            </section>
        );
    }
}