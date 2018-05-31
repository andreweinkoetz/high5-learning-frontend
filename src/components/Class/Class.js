import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const Class = (props) => {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Link to={
                    {
                        pathname: `/myclasses/${props.id}`,
                        state:
                            {title: props.title}
                    }
                }><Typography>{props.title}</Typography></Link>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>{props.description}<br/>
                    URL: <a href={props.url}>{props.url}</a><br/>
                    Password: {props.password}<br/>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );

};

export default Class;