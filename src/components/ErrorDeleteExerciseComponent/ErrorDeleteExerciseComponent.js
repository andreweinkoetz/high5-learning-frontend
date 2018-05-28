import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';


const errorDeleteExerciseComponent = (props) => {
    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <DialogTitle>You homework must have at least one exercise!</DialogTitle>
                <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={props.errorDeleteExerciseMessageRead}
                        >Got it!</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </div>
    )
};

export default errorDeleteExerciseComponent;