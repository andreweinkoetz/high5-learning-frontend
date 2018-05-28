import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Page from './components/Page/Page'
import ClassListView from './views/ClassListView';
import {ExerciseChoices} from './components/ExerciseChoice/ExerciseChoices';
import UserService from './services/UserService';
import ModalDialogNewHomework from "./components/ModalDialogNewHomework/ModalDialogNewHomework";
import ModalDialogNewClass from "./components/ModalDialogNewClass/ModalDialogNewClass";
import LandingPage from './components/LandingPage/LandingPage';
import ClassDetailView from './views/ClassDetailView';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: UserService.getCurrentUser().id,

            routes: [
                {
                    render: () => (<ClassListView/>),
                    path: '/',
                    exact: true
                },
                {
                    render: () => (<ClassListView/>),
                    path: '/myclasses',
                    exact: true
                },

                {component: ClassDetailView, path: '/myclasses/:id', exact: true},
                {component: ExerciseChoices, path: '/exercises', exact: true},
                {component: ModalDialogNewHomework, path: '/modal', exact: true},
                {component: ModalDialogNewClass, path: '/modalC', exact: true}
            ]

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

        if(UserService.isAuthenticated()){
            routes = <Page>{this.state.routes.map((route, i) => (
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