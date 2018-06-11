import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Page from './components/Page/Page'
import ClassListView from './views/ClassListView';
import UserService from './services/UserService';
import LandingPage from './components/LandingPage/LandingPage';
import ClassDetailView from './views/ClassDetailView';
import Notification from './components/Notification/Notification';
import HomeworkDetailView from './views/HomeworkDetailView';
import MyProfile from "./views/MyProfile";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

            notificationFired: false,
            notification: {
                code: 0,
                title: '',
                msg: '',
                variant: ''
            },

            breadcrumbs: [{link: 'myclasses/'}],

            updatedClassesNavBar: [],

            routes: [
                {
                    render: () => (<MyProfile {...props} handleNotification={this.handleNotification}
                                                  updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myprofile',
                    exact: true
                },
                {
                    render: () => (<ClassListView {...props} handleNotification={this.handleNotification}
                                                  updateBreadcrumb={this.updateBreadcrumb}
                                                  updateNavBar={this.updateNavBar}/>),
                    path: '/',
                    exact: true
                },
                {
                    render: () => (<ClassListView {...props} handleNotification={this.handleNotification}
                                                  updateBreadcrumb={this.updateBreadcrumb}
                                                  updateNavBar={this.updateNavBar}/>),
                    path: '/myclasses',
                    exact: true
                },

                {
                    render: (props) => (<ClassDetailView {...props} handleNotification={this.handleNotification}
                                                         updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:title',
                    exact: true
                },
                {
                    render: (props) => (<HomeworkDetailView {...props} handleNotification={this.handleNotification}
                                                            updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:classTitle/homework/:title',
                    exact: true
                }
            ]

        };

        this.updateBreadcrumb = this.updateBreadcrumb.bind(this);
        this.updateNavBar = this.updateNavBar.bind(this);
        this.handleNotification = this.handleNotification.bind(this);

    }

    handleNotification(notification) {
        this.setState({
            notificationFired: true,
            notification: {
                title: notification.title,
                code: notification.code,
                msg: notification.msg,
                variant: notification.variant
            }
        })
    }

    updateNavBar(value) {
        this.setState({updatedClassesNavBar: value})
    }

    updateBreadcrumb(value) {

        let bc = [...value];

        if (bc) {
            this.setState({breadcrumbs: [...bc]})
        } else {
            this.setState({breadcrumbs: undefined})
        }
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: blue,
                secondary: blueGrey
            }

        });

        let routes;

        if (UserService.isAuthenticated()) {
            routes = <Page breadcrumbs={this.state.breadcrumbs}
                           updatedClassesNavBar={this.state.updatedClassesNavBar}
                           handleNotification={this.handleNotification}
            >{this.state.routes.map((route, i) => (
                <Route key={i} {...route}/>))}</Page>;
        } else {
            routes = <Route
                render={() => (<LandingPage {...this.props} handleNotification={this.handleNotification}/>)}
                path={'/'}
            />;
        }


        return (
            <MuiThemeProvider theme={theme}>
                <Notification
                    visible={this.state.notificationFired}
                    notification={this.state.notification}
                    closeDialog={() => {
                        this.setState({notificationFired: false})
                    }}
                />
                <Router>
                    {routes}
                </Router>

            </MuiThemeProvider>
        );

    }
}

export default App;