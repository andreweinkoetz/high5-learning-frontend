import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';


const errorNoTitleClassComponent = (props) => {
    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <DialogTitle>Your class must have a title!</DialogTitle>
                <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={props.errorNoTitleRead}
                        >Got it!</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </div>
    )
};

export default errorNoTitleClassComponent;