import React from 'react';
import { withRouter } from "react-router-dom";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
            breadcrumbs: [],
            breadcrumbsLoading: true
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        UserService.logout();
        window.location.replace(window.location.origin);
    }

    componentDidMount() {
        let currentPath = String(window.location.href);
        currentPath = currentPath.substring("http://localhost:3000".length);
        const newBreadCrumbs = this.getUrlParts(currentPath);
        this.setState({
            title: document.title,
            breadCrumbs:  newBreadCrumbs
        });
    };

    handleClick = () => {
        const oldStateCollapsed = this.state.navBarCollapsed;
        this.setState({navBarCollapsed: !oldStateCollapsed});
    };

    componentDidUpdate(prevState) {
        let currentPath = String(window.location.href);
        currentPath = currentPath.substring("http://localhost:3000".length);
        if (prevState.location.pathname !== currentPath) {
            this.getUrlParts(currentPath);
        }
    }

    getUrlParts(currentPath) {
        let navigation = [];
        currentPath = currentPath.substring("/".length);
        const urlParts = currentPath.split("/");
        let i = 0;
        if (urlParts[0] === "myclasses") {
            navigation.push("My classes");
            if (urlParts.length > 1) {
                const userId = UserService.getCurrentUser().id;
                let classe;
                ClassService.getClassesOfUser().then((data) => {
                    classe = [...data];
                    let correspondingClass = classe.find(i => i._id === urlParts[1]);
                    if (correspondingClass !== null) {
                        navigation.push(correspondingClass.title);
                        let n = navigation.map((k) => {
                            return k + ">";
                        });
                        this.setState({breadcrumbs: n, breadcrumbsLoading: false});
                    };
                }).catch((e) => {
                    console.error(e);
                });
            }
            else {
                let n = navigation.map((k) => {
                    return k + ">";
                });
                this.setState({breadcrumbs: n, breadcrumbsLoading: false});
            }
        };
    }

    render() {

        const styles = {
            distDiv: {
                marginBottom: '40px'
            }
        };


        return (
            <div>
                <Header title={this.state.title} logoutFn={this.logout}/>
                <Grid container spacing={32} alignItems={'flex-start'} justify={'flex-start'}>
                    <Grid item xs={12}>
                        {this.state.breadcrumbsLoading ? null : <Breadcrumb url={this.state.breadcrumbs}/>}
                    </Grid>
                    <Grid item sm={4} md={2}>
                        <Hidden only={'xs'}>
                            <NavBar
                            collapsed={this.state.navBarCollapsed}
                            clicked={this.handleClick}/>
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

export default withRouter(Page);