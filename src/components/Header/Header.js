import React from 'react';
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";

const styles = {
    headDiv: {
        flexGrow: 1,
        marginBottom: 20
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -10,
        marginRight: 20
    },
};

function Header(props) {

    const {classes} = props;

    return (

        <div className={classes.headDiv}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {document.title}
                    </Typography>
                    <Button color="inherit" onClick={props.logoutFn} >Logout</Button>
                </Toolbar>
            </AppBar>
        </div>

    );

}

export default withStyles(styles)(Header);