import React, {Component} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'

import Page from './components/Page/Page'
import {ClassListView} from './views/ClassListView';
import UserService from './services/UserService';
import LandingPage from './components/LandingPage/LandingPage';

class App extends Component {


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: blue
            }

        });

        if(UserService.isAuthenticated()){
            const user = UserService.getCurrentUser();
            const id = user.id;
            return (

                <MuiThemeProvider theme={theme}>
                    <Page>
                        <ClassListView userId={id}/>
                    </Page>
                </MuiThemeProvider>

            );
        }else{
            // for debugging purposes. Later return LandingPage here.
            return (
                <MuiThemeProvider theme={theme}>
                    <Page>
                        <ClassListView userId={id}/>
                    </Page>
                </MuiThemeProvider>
            );
        }


    }
}

export default App;
