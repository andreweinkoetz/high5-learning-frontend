import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Page from './components/Page/Page'
import {ClassListView} from './views/ClassListView';
import {ExerciseChoices} from './components/ExerciseChoice/ExerciseChoices';
import UserService from './services/UserService';


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
            <MuiThemeProvider theme={theme}>
                <Page>
                    <Router>
                        <Switch>
                            {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                        </Switch>
                    </Router>
                </Page>
            </MuiThemeProvider>
        );


    }
}

export default App;