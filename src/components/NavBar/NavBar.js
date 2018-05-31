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

const NavBar = (props) => {

    return (<div>
        <List>
            <Link
                to="/myclasses"
                style={{textDecoration: 'none'}}
            ><ListItem button>
                <ListItemText primary="My classes"/></ListItem>
            </Link>
        <Divider/>
            <ListItem button onClick={props.clicked}>
                <ListItemText primary="My homework"/>
                <ListItemIcon>
                    {props.collapsed ? <ExpandMore/> : <ExpandLess/>}
                </ListItemIcon>
            </ListItem>
            <Collapse in={props.collapsed}>
                <List>
                    <ListItem button>
                        <ListItemText inset primary="Add new homework"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText inset primary="Enable deleting homework"/>
                    </ListItem>
                </List>
            </Collapse>
            <Divider/>
            <ListItem button>
                <ListItemText primary="My settings"/>
            </ListItem>
            <Divider/>
            <ListItem button>
                <ListItemText primary="My profile"/>
            </ListItem>
        </List>
    </div>);
};

export default NavBar;