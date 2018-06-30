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
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = theme => ({
    icons: {
        color: theme.palette.secondary.main,
        fontSize: 36
    }
});

// Navigation bar on the left side of the page
const NavBar = (props) => {
    const {classes} = props;

    let myClasses = props.myClasses.map(c => {
        return (
            <ListItem
                key={c._id}
                button
                component={Link}
                to={{
                    pathname: `/myclasses/${c.title}`,
                    state:
                        {
                            title: c.title,
                            id: c._id
                        }
                }}>
                <ListItemText inset primary={c.title}/>
            </ListItem>)
    });

    return (<div style={{paddingLeft: 50}}>
        <div style={{minHeight: 56}}>
            <Typography variant={'title'}>Menu</Typography>
            <Typography variant={'caption'}>Find all you need here</Typography>
        </div>

        <Divider/>

        <List>
            <ListItem button component={Link} to={"/myclasses"}>
                <GroupIcon className={classes.icons}/>
                <ListItemText primary="My classes"/>
            </ListItem>

            <Divider/>
            <ListItem button onClick={props.clicked}>
                <AssignmentIcon className={classes.icons}/>
                <ListItemText primary="My homework"/>
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
            <ListItem button component={Link} to={"/myprofile"}>
                <AccountCircle className={classes.icons}/>
                <ListItemText primary="My profile"/>
            </ListItem>
        </List>
    </div>);
};

export default withStyles(styles)(NavBar);