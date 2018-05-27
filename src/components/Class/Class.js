import React, {Component} from 'react';
//import {ExpansionPanel} from 'react-md';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

export default class Class extends Component {

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
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Link to={'myclasses/'+this.state.id}><Typography>{this.state.title}</Typography></Link>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>{this.state.description}<br/>
                        URL: <a href={this.state.url}>{this.state.url}</a><br/>
                    Password: {this.state.password}<br/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
