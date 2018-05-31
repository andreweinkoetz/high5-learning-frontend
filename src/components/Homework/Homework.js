import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const Homework = (props) => {

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Link to={
                        {
                            pathname: `/homework/${props.id}`,
                            state:
                                { title: props.title}
                        }
                    }><Typography>{props.title}</Typography></Link>
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

};

export default Homework;
