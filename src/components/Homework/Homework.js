import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import UserService from '../../services/UserService';

const Homework = (props) => {

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Link to={
                        {
                            pathname: `/myclasses/${props.classTitle}/homework/${props.title}`,
                            state:
                                {
                                    title: props.title,
                                    id: props.id,
                                    classId: props.classId,
                                    classTitle: props.classTitle
                                }
                        }
                    }><Typography>{props.title}</Typography></Link>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {UserService.isTeacher() ?
                    <Typography>
                        Statistics of homework<br/>
                        Here will be some statistics<br/>
                        Here will be some statistics<br/>
                         <Button variant="raised" color="primary" style={{marginRight: '10px', marginTop: '10px'}} onClick={() => props.updateHomeworkTitle(props.id, props.title)}>
                            Update homework title</Button>
                        <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}} onClick={() => props.deleteHomework(props.id)}>
                            Delete homework</Button>
                    </Typography>: null}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );

};

export default Homework;
