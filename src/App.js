import React, {Component} from 'react';
import Page from './components/Page/Page'

import './App.css';
import {ClassListView} from "./views/ClassListView";

class App extends Component {



    render() {
        return (
            <Page>
                <ClassListView />
            </Page>
        );
    }
}

export default App;
