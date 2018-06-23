import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {withStyles} from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';

import UserService from '../../services/UserService';
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";


const styles = theme => ({
    hwIcon: {
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
        marginLeft: theme.spacing.unit + 5
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
    },
    cakeIcon: {
        color: theme.palette.primary.main,
        fontSize: 32,
        marginRight: 10
    }
});


const Homework = (props) => {

    const {classes} = props;

    let panelDetail = <div></div>; // teacher: homework edit/delete button, student: submission info-text
    let secondaryContent = <div></div>; // teacher: make homework (in-)visible, student: cake icon if rank === #1

    const hwIcon = props.isSubmitted ? <AssignmentTurnedInIcon className={classes.hwIcon}/> :
        <AssignmentIcon className={classes.hwIcon}/>; // the icon changes if the student has submitted the homework

    if (UserService.isTeacher()) {
        panelDetail =
            <Typography>
                <Tooltip id="visibility-info"
                         title={"Use the switch one the ride side of this panel to make the homework" + (props.homeworkVisible ? " invisible " : " visible ") + "for your students"}>
                    <i id="visibility-info">{props.homeworkVisible ? "This homework is visible for your students." : "This homework is invisible for your students"}</i>
                </Tooltip>
                <br/><br/>
                {props.homeworkVisible ? null
                    : <Button variant="raised" color="primary" style={{marginRight: '20px', marginTop: '10px'}}
                              onClick={() => props.updateHomework(props.id)}>
                        Update homework</Button>}
                <Button variant="raised" color="secondary" style={{marginTop: '10px'}}
                        onClick={() => props.deleteHomework(props.id)}>
                    Delete homework</Button>
            </Typography>;
        secondaryContent = <Tooltip id="tooltip-bottom"
                                    title={props.homeworkVisible ? "Activate to make homework invisible" : "Activate to make homework visible"}>
            <Switch checked={props.homeworkVisible} color={"primary"}
                    onChange={props.changeSwitch(props.id)}/>
        </Tooltip>;
    } else {
        secondaryContent= props.rank === 1 && <CakeIcon className={classes.cakeIcon}/>; // display cake and modify text if student was the first one to submit!
        panelDetail = props.rank ?
            <Typography>{props.rank === 1 ? "Congratulations! ": "Well done! "}You've submitted your solutions as #{props.rank}!</Typography>
            : <Typography>You haven't submitted this homework yet.</Typography> // if not submitted
    }

    return (
        <ExpansionPanel className={!props.homeworkVisible ? classes.panelDisabled : null}>
            <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon/>}>
                <div className={classes.primaryContent}>
                    <Link
                        className={classes.linkStyle} to={
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
                    }>

                        <Button variant="flat"
                                className={classes.titleButton}>
                            {hwIcon}
                            {props.title}
                        </Button></Link>
                    <Typography variant={'caption'} className={classes.subtitle}>Created
                        at: {new Date(props.createdAt).toLocaleDateString()} - {new Date(props.createdAt).toLocaleTimeString()}</Typography>
                </div>
                <div className={classes.secondaryContent}>
                    {secondaryContent}
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {panelDetail}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(Homework);
