import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import CreateExercise from '../CreateExercise/CreateExercise';

import Grid from '@material-ui/core/Grid';

class ModalDialogNewHomework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            exercises: [
                {id: '1'}
            ],
            numberOfExercises: 1
        };
    }

    disappear = () => {
        this.setState({visible: false})
    };

    addExercise = () => {
        let c = [...this.state.exercises];
        let n = this.state.numberOfExercises;
        n = n + 1;
        c.push({id: n});
        this.setState({numberOfExercises: n, exercises: c});
    }

    render () {

        let exercises = this.state.exercises
            .map(exc => {
                    return (
                        <CreateExercise key={exc.id} id={exc.id}/>
                    )
                }
            )

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.visible}
                >
                    <DialogTitle>Create new homework</DialogTitle>
                    <DialogContent>
                    <TextField
                        label="Title"
                        helperText="Required"
                        required={true}
                        fullWidth={true}
                        autoFocus={true}
                    /><div style={{maxHeight:'500px', marginBottom: '20px'}}>
                        {exercises}
                    </div>
                    </DialogContent>
                    <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.addExercise}
                        >Add new exercise to homework</Button>
                    </DialogActions>
                    </Grid>
                    <Grid container justify={"center"}>
                <DialogActions>
                    <Button
                        color={"primary"}
                        variant={"raised"}
                        onClick={this.disappear}
                    >Create homework</Button>
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={this.disappear}
                    >Cancel</Button>
                </DialogActions>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogNewHomework;