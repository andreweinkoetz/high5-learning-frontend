import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Page from './components/Page/Page'
import {ClassListView} from './views/ClassListView';
import {ExerciseChoices} from './components/ExerciseChoice/ExerciseChoices';
import UserService from './services/UserService';
import ModalDialogNewHomework from "./components/ModalDialogNewHomework/ModalDialogNewHomework";
import ModalDialogNewClass from "./components/ModalDialogNewClass/ModalDialogNewClass";
import LandingPage from "./components/LandingPage/LandingPage";


class App extends Component {

    constructor(props) {
        super(props);

        let userId = 1;

        this.state = {
            userId: UserService.getCurrentUser().id,
            routes: [
                {
                    render: () => (<ClassListView userId={userId}/>),
                    path: '/myclasses',
                    exact: true
                },

                {component: ExerciseChoices, path: '/exercises', exact: true},
                {component: ModalDialogNewHomework, path: '/modal', exact: true},
                {component: ModalDialogNewClass, path: '/modalC', exact: true},
            ]

        }
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: blue
            }

        });

        /*const routes = UserService.isAuthenticated() ? [
            {component: ClassListView, path: '/', exact: true},
            {component: ExerciseChoices, path: '/homework', exact: true}
        ] : [{component: ExerciseChoices, path: '/'}];*/


        return (
            <LandingPage/>
        );


    }
}

export default App;