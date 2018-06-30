import React from 'react';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import SchoolIcon from "@material-ui/icons/School";
import {withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/es/Menu/Menu";

const styles = {
    headDiv: {
        flexGrow: 1,
        marginBottom: 60
    },
    flex: {
        flex: 1
    },
    homeButton: {
        marginLeft: -10,
        marginRight: 20
    },
    menuIcon: {
        marginRight: 20
    }
};

// Header element as a toolbar with some functionality regarding navigation and logging out.
function Header(props) {

    const {classes} = props;

    let menu;

    if (props.isXs) {
        menu = <div className={classes.menuIcon}>
            <IconButton
                aria-owns={Boolean(props.anchorEl) ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={props.handleMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(props.anchorEl)}
                onClose={props.handleMenuClose}
            >
                <MenuItem onClick={() => {
                    window.location.href = '/myclasses'
                }}>My classes</MenuItem>
                <MenuItem onClick={() => {
                    window.location.href = '/myprofile'
                }}>My profile</MenuItem>
                <MenuItem onClick={props.logoutFn}>Logout</MenuItem>
            </Menu>
        </div>
    } else {
        menu = <Button color="inherit" onClick={props.logoutFn}>Logout</Button>;
    }

    return (

        <div className={classes.headDiv}>
            <AppBar>
                <Toolbar>
                    <div style={{marginRight: 10}}>
                        <IconButton className={classes.homeButton} color="inherit" aria-label="School" onClick={() => {
                            window.location.href = '/myclasses'
                        }}>
                            <SchoolIcon style={{fontSize: 34}}/>
                        </IconButton>
                    </div>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {document.title}
                    </Typography>
                    {menu}
                </Toolbar>
            </AppBar>
        </div>

    );

}

export default withStyles(styles)(Header);