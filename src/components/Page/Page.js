import React from 'react';
import {withRouter} from "react-router-dom";

import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import NavBar from '../NavBar/NavBar';
import Grid from '@material-ui/core/Grid';

import Hidden from "@material-ui/core/es/Hidden/Hidden";
import UserService from "../../services/UserService";
import ClassService from "../../services/ClassService";


class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            isAuthenticated: UserService.isAuthenticated(),
            navBarCollapsed: false,
            anchorEl: null,
            classes: [],
            updatedClasses: [],
            loading: true
        };

        this.logout = this.logout.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    componentWillMount() {
        ClassService.getClassesOfUser().then((data) => {
            this.setState({classes: [...data], loading: false});
            if (data.length === 0){

            }
        });
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };


    logout() {
        UserService.logout();
        window.location.replace(window.location.origin);
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    };

    handleClick = () => {
        if (this.state.classes.length !== 0) {
            const oldStateCollapsed = this.state.navBarCollapsed;
            this.setState({navBarCollapsed: !oldStateCollapsed});
        }
        else {
            this.props.handleNotification({
                title: 'Showing classes is not possible!',
                msg: 'You do not have any classes to show!',
                code: 12,
                variant: 'warning'
            });
        }
    };

    componentWillUpdate(nextProps) {
        if (nextProps.updatedClassesNavBar !== this.state.updatedClasses) {
            this.setState({classes: nextProps.updatedClassesNavBar,
                updatedClasses: nextProps.updatedClassesNavBar});
        }
    }

    render() {
/*        const styles = {
            distDiv: {
                marginBottom: '40px'
            }
        };*/


        return (
            <div>

                <Grid container spacing={32} alignItems={'flex-start'} justify={'flex-start'}>
                    <Grid item xs={12}>
                        <Hidden only={'xs'}>
                            <Header title={this.state.title} isXs={false} logoutFn={this.logout}/>
                        </Hidden>
                        <Hidden smUp>
                            <Header
                                title={this.state.title}
                                isXs={true}
                                anchorEl={this.state.anchorEl}
                                handleMenu={this.handleMenu}
                                handleMenuClose={this.handleMenuClose}
                                logoutFn={this.logout}
                            />
                        </Hidden>
                    </Grid>
                    <Grid item xs={12}>
                        {<Breadcrumb breadcrumbs={this.props.breadcrumbs}/>}
                    </Grid>
                    <Grid item sm={4} md={2}>
                        <Hidden only={'xs'}>
                            {this.state.loading ? null :
                                <NavBar
                                collapsed={this.state.navBarCollapsed}
                                clicked={this.handleClick}
                                classes={this.state.classes}/>}
                        </Hidden>
                    </Grid>
                    <Grid item xs={10} sm={7} md={9}>
                        {this.props.children}
                    </Grid>
                </Grid>
                {/*<div style={styles.distDiv}>&nbsp;</div>
                <Footer/>*/}

            </div>
        );
    }
}

export default withRouter(Page);