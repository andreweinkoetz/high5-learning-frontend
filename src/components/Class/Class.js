import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';

import UserService from "../../services/UserService";
import Badge from "@material-ui/core/es/Badge/Badge";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

const styles = theme => ({
    rightIcon: {
        color: theme.palette.primary.main,
        fontSize: 36,
        marginRight: 5
    },
    linkStyle: {
        textDecoration: 'none'
    },
    summary: {
        padding: 10
    },
    primaryContent: {
        flexBasis: '80%',
        textAlign: 'left',
    },
    secondaryContent: {
        flexBasis: '20%',
        textAlign: 'right',
        paddingTop: 10,
        marginRight: 10
    },
    subtitle: {
        marginLeft: theme.spacing.unit
    },
    titleButton: {
        padding: 10,
        borderRadius: 12,
        color: 'black',
        fontWeight: 'normal',
        textTransform: 'none'
    },
    panelDisabled: {
        backgroundColor: 'rgba(158,158,158,0.2)'
    }
});

// A single class component to be displayed in an expansion panel
// A teacher has additional buttons to alter the class information or delete the class.
const Class = (props) => {

    const {classes} = props;

    let secondaryContent; // Badge element only for students with open homework within this class

    if (UserService.isTeacher() || (props.openHomework === undefined || props.openHomework === 0 )) {
        secondaryContent = null
    } else {
        secondaryContent =
            <Tooltip id="tooltip-top-start" title={props.openHomework + " assignments not submitted"} placement="top-start">
                <Badge color="error" badgeContent={props.openHomework}>
                    <Typography/>
                </Badge>
            </Tooltip>;
    }

    return (
        <ExpansionPanel>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <div className={classes.primaryContent}>

                    <Link className={classes.linkStyle} to={
                        {
                            pathname: `/myclasses/${props.title}`,
                            state:
                                {
                                    title: props.title,
                                    id: props.id
                                }
                        }
                    }>

                        <Button variant="flat"
                                className={classes.titleButton}>

                            <GroupIcon className={classes.rightIcon}/>
                            {props.title}
                        </Button>
                    </Link>

                    <Typography variant={'caption'} className={classes.subtitle}>{props.description}</Typography>
                    <Typography variant={'caption'} className={classes.subtitle}>Created
                        at: {new Date(props.createdAt).toLocaleDateString()} - {new Date(props.createdAt).toLocaleTimeString()}</Typography>
                </div>

                <div className={classes.secondaryContent}>
                    {secondaryContent}
                </div>

            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                {UserService.isTeacher() ? <div>
                        <Tooltip id="tooltip-studentCount" title="To add more students to this class, update the class information.">
                            <i>You added {props.studentCount} {(props.studentCount !== 1) ? "students" : "student"} to this class.</i>
                        </Tooltip>
                        <br/><br/>
                        <Button variant="raised" color="primary" style={{marginRight: '10px', marginTop: '10px'}}
                                onClick={() => props.updateClassInfo(props.id, props.title, props.description)}>
                            Update class information</Button>
                        <Button variant="raised" color="secondary" style={{marginLeft: '10px', marginTop: '10px'}}
                                onClick={() => props.deleteClass(props.id)}>
                            Delete class</Button>
                    </div>
                    : <Typography>{props.openHomework > 0 ? "You have " + props.openHomework + " open homework to submit in this class." : "You submitted all homework in this class"}<br/>
                    </Typography>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );

};

export default withStyles(styles)(Class);