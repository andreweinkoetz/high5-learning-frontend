import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import UserService from '../../services/UserService';

const Homework = (props) => {

    /*let buttonStatusHomework = null;
    if (props.homeworkVisible) {
        buttonStatusHomework =
            <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}}
                    onClick={() => props.makeHomeworkInvisible(props.id)}>
                Make homework invisible to students</Button>
    }
    else {
        buttonStatusHomework =
            <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}}
                    onClick={() => props.makeHomeworkVisible(props.id)}>
                Make homework visible to students</Button>
    };
    */

    let buttonsForTeacher = <div/>;
    if (UserService.isTeacher()) {
        buttonsForTeacher =
            <Typography>
                Statistics of homework<br/>
                Here will be some statistics<br/>
                Here will be some statistics<br/>
                <Button variant="raised" color="primary" style={{marginRight: '10px', marginTop: '10px'}}
                        onClick={() => props.updateHomeworkTitle(props.id, props.title)}>
                    Update homework title</Button>
                <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}}
                        onClick={() => props.deleteHomework(props.id)}>
                    Delete homework</Button>
                <FormControlLabel
                    style={{marginLeft: '10px'}}
                    control={<Switch checked={props.homeworkVisible} onChange={props.changeSwitch(props.id)} color={"primary"}/>}
                    label={props.homeworkVisible ? "Homework visible" : "Homework invisible"}/>
            </Typography>
    };

        return (
            <div>
                {/*{(!props.homeworkVisible && !UserService.isTeacher())
                    ?
                    null
                    :*/} <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
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
                            {buttonsForTeacher}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
            {/*    }*/}
            </div>
        );
};

export default Homework;
