import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import NavBar from '../NavBar/NavBar';
import Grid from '@material-ui/core/Grid';

import Hidden from "@material-ui/core/es/Hidden/Hidden";
import UserService from "../../services/UserService";

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }

        this.logout = this.logout.bind(this);
    }

    logout(){
        UserService.logout();
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {

        const styles = {
            distDiv: {
                marginBottom: '40px'
            }
        }


        return (
            <div>
                <Header title={this.state.title} logoutFn={this.logout} />

                <Grid container spacing={32} alignItems={'flex-start'} justify={'flex-start'}>
                    <Grid item xs={12}>
                        <Breadcrumb sites={["home", "newpage", "lastpage"]}/>
                    </Grid>
                    <Grid item sm={4} md={2}>
                        <Hidden only={'xs'}>
                            <NavBar/>
                        </Hidden>
                    </Grid>
                    <Grid item xs={10} sm={7} md={9}>
                        {this.props.children}
                    </Grid>
                </Grid>
                <div style={styles.distDiv}>&nbsp;</div>
                <Footer/>

            </div>
        );
    }
}