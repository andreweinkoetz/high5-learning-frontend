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
            exercisesID: [
                {id: '1'}
            ],
            numberOfExercises: 1,
            exercisesRightSolutions: [
                {id: '1', rightSolution: ""}
            ],
            exercisesSolutionPossibilities: [
                {id: '1', solutionPossibilities: [
                        {a1: ""},
                        {a2: ""},
                        {a3: ""},
                        {a4: ""}
                    ]}
            ]
        };
    }

    handleCancel = () => {
        this.setState({visible: false})
    };

    changeRightSolution = (id) => (event) => {
        let r = [...this.state.exercisesRightSolutions];
        let i = r.find(e => e.id === id);
        i.rightSolution = event.target.value;
        this.setState({exercisesRightSolutions: r})
    };

    changeSolutionPossibilities = (id, answerID) => (event) => {
        let r = [...this.state.exercisesSolutionPossibilities];
        let i = r.find(e => e.id === id);
        let s = i.solutionPossibilities[answerID-1];
        let b = "a"+answerID;
        s[b] = event.target.value;
        this.setState({exercisesSolutionPossibilities: r});
        console.log(r);
    };

    addExercise = () => {
        let c = [...this.state.exercisesID];
        let n = this.state.numberOfExercises;
        n = n + 1;
        c.push({id: n});
        this.setState({numberOfExercises: n, exercisesID: c});
    }

    render () {

        let exercises = this.state.exercisesID.map(exc => {
                return (
                    <CreateExercise
                        key={exc.id}
                        id={exc.id}
                        changeRadio={this.changeRightSolution}
                        changeAnswers={this.changeSolutionPossibilities}
                        value={this.state.exercisesRightSolutions.find(e => e.id === exc.id).rightSolution}
                    />
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
                    />
                        <div style={{maxHeight:'500px', marginBottom: '20px'}}>
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
                        onClick={this.handleCancel}
                    >Cancel</Button>
                </DialogActions>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogNewHomework;