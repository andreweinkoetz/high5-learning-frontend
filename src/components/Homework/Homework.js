import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

export default class Homework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title
        };

    }

    render() {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Link to={
                        {
                            pathname: `/homework/${this.state.id}`,
                            state:
                                { title: this.state.title}
                        }
                    }><Typography>{this.state.title}</Typography></Link>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Statistics of homework<br/>
                        Here will be some statistics<br/>
                        Here will be some statistics<br/>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
