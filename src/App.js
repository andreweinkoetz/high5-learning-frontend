import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Page from './components/Page/Page'
import ClassListView from './views/ClassListView';
import UserService from './services/UserService';
import ModalDialogNewHomework from "./components/ModalDialogNewHomework/ModalDialogNewHomework";
import ModalDialogNewClass from "./components/ModalDialogNewClass/ModalDialogNewClass";
import LandingPage from './components/LandingPage/LandingPage';
import ClassDetailView from './views/ClassDetailView';

import HomeworkDetailView from './views/HomeworkDetailView';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: UserService.getCurrentUser().id,

            breadcrumbs: [{link: 'myclasses/'}],

            routes: [
                {
                    render: () => (<ClassListView {...props} updateBreadcrumb={this.updateBreadcrumb} />),
                    path: '/',
                    exact: true
                },
                {
                    render: () => (<ClassListView {...props} updateBreadcrumb={this.updateBreadcrumb} />),
                    path: '/myclasses',
                    exact: true
                },

                {
                    render: (props) => (<ClassDetailView {...props} updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:title',
                    exact: true
                },
                {
                    render: (props) => (<HomeworkDetailView {...props} updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:classTitle/homework/:title',
                    exact: true
                },

                {component: ModalDialogNewHomework, path: '/modal', exact: true},
                {component: ModalDialogNewClass, path: '/modalC', exact: true}
            ]

        };

        this.updateBreadcrumb = this.updateBreadcrumb.bind(this);

    }

    updateBreadcrumb(value) {

        let bc = [...value];

        if(bc) {
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
            routes = <Page breadcrumbs={this.state.breadcrumbs}>{this.state.routes.map((route, i) => (
                <Route key={i} {...route}/>))}</Page>;
        } else {
            routes = <Route component={LandingPage} path={'/'}/>;
        }


        return (
            <MuiThemeProvider theme={theme}>

                <Router>
                    {routes}
                </Router>

            </MuiThemeProvider>
        );

    }
}

export default App;