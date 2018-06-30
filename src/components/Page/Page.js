import React from 'react';
import {withRouter} from "react-router-dom";

import Header from '../Header/Header';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import NavBar from '../NavBar/NavBar';
import Grid from '@material-ui/core/Grid';

import Hidden from "@material-ui/core/es/Hidden/Hidden";
import UserService from "../../services/UserService";
import ClassService from "../../services/ClassService";

// Main layout of the "logged in" UI
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
        ClassService.getClassesOfUser().then((data) => { // get all classes of a user
            this.setState({classes: [...data], loading: false});
        });
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget}); // set element to which header-kebab menu is locked when displaying
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null}); // hide header-kebab menu
    };


    logout() { // logout and redirect
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.updatedClassesNavBar !== this.state.updatedClasses) {
            this.setState({
                classes: this.props.updatedClassesNavBar,
                updatedClasses: this.props.updatedClassesNavBar
            });
        }
    }

    render() {

        /* basic layout:
            header
            breadcrumbs
            navbar | content
        */

        // The header has a kebab menu when in mobile view, as the navbar is not visible in mobile!
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
                    <Grid item sm={4} md={3}>
                        <Hidden only={'xs'}>
                            {this.state.loading ? null :
                                <NavBar
                                    collapsed={this.state.navBarCollapsed}
                                    clicked={this.handleClick}
                                    myClasses={this.state.classes}/>}
                        </Hidden>
                    </Grid>
                    <Grid item xs={10} sm={7} md={8}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Page);