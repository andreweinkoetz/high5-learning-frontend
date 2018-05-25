import React, {Component} from 'react';
import {ExpansionPanel} from 'react-md';

export default class ClassDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            url: props.url,
            password: props.password
        }

        this.panelClicked = this.panelClicked.bind(this);
    }

    panelClicked(){
        alert('Clicked!');
    }

    render() {
        return (<ExpansionPanel label={this.state.title} saveLabel={"Go to"} onSave={this.panelClicked} columnWidths={this.props.columnWidths} focused={this.props.focused} >
            <p>{this.state.description}</p>
            <span>URL: {this.state.url}</span>
            <p>Password: {this.state.password}</p>
        </ExpansionPanel>);
    }
}
