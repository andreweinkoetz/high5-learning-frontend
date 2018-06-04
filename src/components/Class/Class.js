import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

import UserService from "../../services/UserService";

const Class = (props) => {

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Link to={
                    {
                        pathname: `/myclasses/${props.title}`,
                        state:
                            {
                                title: props.title,
                                id: props.id
                            }
                    }
                }><Typography>{props.title}</Typography></Link>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {UserService.isTeacher() ? <Typography>{props.description}<br/>
                    URL: <a href={props.url}>{props.url}</a><br/>
                    Password: {props.password}<br/>
                    <Button variant="raised" color="primary" style={{marginRight: '10px', marginTop: '10px'}} onClick={() => props.updateClassInfo(props.id, props.title, props.description)}>
                        Update class information</Button>
                    <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}} onClick={() => props.deleteClass(props.id)}>
                        Delete class</Button>
                </Typography> : <Typography>{props.description}<br/>
                </Typography>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );

};

export default Class;