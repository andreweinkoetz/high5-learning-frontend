import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/es/Divider/Divider";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {withStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    icons: {
        color: theme.palette.secondary.main,
        fontSize: 36
    },
});

const NavBar = (props) => {
    const {classes} = props;

    let myClasses = props.myClasses.map(c => {
        return (
            <Link to={
                {
                    pathname: `/myclasses/${c.title}`,
                    state:
                        {
                            title: c.title,
                            id: c._id
                        }
                }
            }
                  style={{textDecoration: 'none'}}
                  key={c._id}>
                <ListItem button>
                    <ListItemText inset primary={c.title}/>
                </ListItem>
            </Link>)
    });

    return (<div>
        <List>
            <Link
                to="/myclasses"
                style={{textDecoration: 'none'}}
            ><ListItem button>
                <GroupIcon className={classes.icons}/>
                <ListItemText primary="My classes"/>
            </ListItem>
            </Link>
            <Divider/>
            <ListItem button onClick={props.clicked}>
                <GroupIcon className={classes.icons}/>
                <ListItemText primary="My classes in detail (don't know how to call this)"/>
                <ListItemIcon>
                    {props.collapsed ? <ExpandMore/> : <ExpandLess/>}
                </ListItemIcon>
            </ListItem>
            <Collapse in={props.collapsed}>
                <List>
                    {myClasses}
                </List>
            </Collapse>
            <Divider/>
            <ListItem button onClick={() => {
                window.location.href = "/myprofile"
            }}>
                <AccountCircle className={classes.icons}/>
                <ListItemText primary="My profile"/>
            </ListItem>
        </List>
    </div>);
};

export default withStyles(styles)(NavBar);