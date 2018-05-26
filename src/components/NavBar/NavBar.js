import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/es/Divider/Divider";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconAccessible from '@material-ui/icons/Accessibility'
import Phone1 from '@material-ui/icons/PhoneIphone';

const NavBar = (props) => {

    return (<div><List component="nav">
        <ListItem button>
            <ListItemIcon>
                <IconAccessible/>
            </ListItemIcon>
            <ListItemText primary="Link"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <IconAccessible/>
            </ListItemIcon>
            <ListItemText primary="Link"/>
        </ListItem>
    </List>
        <Divider/>
        <List component="nav">
            <ListItem button>
                <ListItemText primary="Link"/>
                <ListItemIcon>
                    <Phone1/>
                </ListItemIcon>
            </ListItem>
            <ListItem button component="a" href="#simple-list">
                <ListItemText primary="Link"/>
                <ListItemIcon>
                    <Phone1/>
                </ListItemIcon>
            </ListItem>
        </List>
    </div>);

}

export default NavBar;