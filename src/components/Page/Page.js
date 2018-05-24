import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import NavBar from '../NavBar/NavBar';
import {Grid, Cell} from 'react-md';
import './Page.css';

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
                <Breadcrumb sites={["home", "newpage", "lastpage"]}/>
                <Grid className="body-grid">
                    <Cell size={2} phoneHidden={true} tabletSize={2} className={"test"}>
                        <NavBar/>
                    </Cell>
                    <Cell size={10} phoneSize={12} tabletSize={10} className={"content"}>{this.props.children}</Cell>
                </Grid>
                <div className={"spacey"}></div>
                <Footer/>

            </section>
        );
    }
}