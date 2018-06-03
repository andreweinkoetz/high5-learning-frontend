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
import ModalDialogRegisteringStudentToClass
    from './components/ModalDialogRegisteringStudentToClass/ModalDialogRegisteringStudentToClass';
import Exception from './components/Exception/Exception';
import HomeworkDetailView from './views/HomeworkDetailView';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

            error: {
                fired: false,
                code: 0,
                title: '',
                msg: ''
            },

            breadcrumbs: [{link: 'myclasses/'}],

            routes: [
                {
                    render: (props) => (
                        <ModalDialogRegisteringStudentToClass {...props} handleException={this.handleException}/>),
                    path: '/goToClass/:classId',
                    exact: true
                },
                {
                    render: () => (<ClassListView {...props} handleException={this.handleException}
                                                  updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/',
                    exact: true
                },
                {
                    render: () => (<ClassListView {...props} handleException={this.handleException}
                                                  updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses',
                    exact: true
                },

                {
                    render: (props) => (<ClassDetailView {...props} handleException={this.handleException}
                                                         updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:title',
                    exact: true
                },
                {
                    render: (props) => (<HomeworkDetailView {...props} handleException={this.handleException}
                                                            updateBreadcrumb={this.updateBreadcrumb}/>),
                    path: '/myclasses/:classTitle/homework/:title',
                    exact: true
                },

                {component: ModalDialogNewHomework, path: '/modal', exact: true},
                {component: ModalDialogNewClass, path: '/modalC', exact: true}
            ]

        };

        this.updateBreadcrumb = this.updateBreadcrumb.bind(this);
        this.handleException = this.handleException.bind(this);

    }

    handleException(error) {
        this.setState({error: {fired: true, title: error.title, code: error.code, msg: error.msg}})
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
            routes = <Page breadcrumbs={this.state.breadcrumbs}>{this.state.routes.map((route, i) => (
                <Route key={i} {...route}/>))}</Page>;
        } else {
            routes = <Route
                render={() => (<LandingPage {...this.props} handleException={this.handleException}/>)}
                path={'/'}
                />;
        }


        return (
            <MuiThemeProvider theme={theme}>
                <Exception
                    visible={this.state.error.fired}
                    error={this.state.error}
                    closeDialog={() => {
                        this.setState({error: {fired: false}})
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