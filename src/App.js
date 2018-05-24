import React, {Component} from 'react';
import Page from './components/Page/Page'
import ClassList from './components/Class/ClassList';

import './App.css';

class App extends Component {

    classes = [
        {
            id: 127,
            title: "Math",
            description: "Veeeeeery long description of the specific contents of this class.",
            URL: "www.high5learning.com/classes/127",
            password: "very very secret password"
        },
        {
            id: 128,
            title: "Biology",
            description: "Veeeeeery long description of the specific contents of this class.",
            URL: "www.high5learning.com/classes/128",
            password: "very very secret password"
        },
        {
            id: 129,
            title: "Chemistry",
            description: "Veeeeeery long description of the specific contents of this class.",
            URL: "www.high5learning.com/classes/129",
            password: "very very secret password"
        },
        {
            id: 130,
            title: "Physics",
            description: "Veeeeeery long description of the specific contents of this class.",
            URL: "www.high5learning.com/classes/130",
            password: "very very secret password"
        }
    ]

    render() {
        return (
            <Page>
                <ClassList classes={this.classes}/>
            </Page>
        );
    }
}

export default App;
