import React, {Component} from 'react';
import Page from './components/Page/Page'
import {ClassListView} from "./views/ClassListView";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'

class App extends Component {


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: blue
            }

        });

        return (

                <MuiThemeProvider theme={theme}>
                    <Page>
                        <ClassListView/>
                    </Page>
                </MuiThemeProvider>

        );
    }
}

export default App;
