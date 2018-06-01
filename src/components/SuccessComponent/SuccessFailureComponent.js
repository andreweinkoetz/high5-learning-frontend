import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';


const successFailureComponent = (props) => {
    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <DialogTitle>{props.success ? "Registration was successful!" : "Registration was not successful"}</DialogTitle>
                <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={props.messageRead}
                        >Got it!</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </div>
    )
};

export default successFailureComponent;