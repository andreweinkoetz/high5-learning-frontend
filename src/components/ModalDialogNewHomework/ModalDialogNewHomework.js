import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CreateExercise from '../CreateExercise/CreateExercise';

const ModalDialogNewHomework = (props) => {

    /*handleCreate = () => { // in case you want to find out in general whether something is missing
        let testRightSolutionMissing = false;
        this.state.exercisesData.map(
            e => {if(e.rightSolution === "") {
                testRightSolutionMissing = true;
            }}
        );
        let testSolutionPossibilitiesMissing = false;
        this.state.exercisesData.map(
            e => e.solutionPossibilities.map(
                e1 => {if(Object.values(e1)[0] === "") { with this you get single values of the Objects in array solutionPossibilities
                    testSolutionPossibilitiesMissing = true;
                }}
            )
        );
        ;
    };*/
    let exercises = props.exercises.map(exc => {
            return (
                <CreateExercise
                    key={exc.id}
                    id={exc.id}
                    changeRadioValue={props.handleChangeRadioValue}
                    changeAnswers={props.handleChangeAnswers}
                    radioValue={props.exercises.find(e => e.id === exc.id).rightSolution}
                    changeQuestion={props.handleExerciseQuestionChange}
                    errorExerciseQuestion={props.exercisesErrors[exc.id-1].question}
                    errorExerciseAnswers={props.exercisesErrors[exc.id-1].answers}
                    handleDeleteExercise={props.handleDeleteExercise}
                    answersValues={props.exercises[exc.id-1].answers}
                    questionValue={props.exercises[exc.id-1].question}
                    ableToDeleteExercises={props.ableToDeleteExercises}
                />
            )
        }
    );

    let alreadyAddedHomeworks = props.alreadyAddedHomework.map(h => {
        console.log(h);
        return (<MenuItem>{h.title}</MenuItem>)
    })

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <FormControl>
                    <Select
                        value={"None"}
                        onChange={() => this.props.change}>
                        {alreadyAddedHomeworks}
                    </Select>
                </FormControl>
                {props.updateHomeworkWished ? <DialogTitle>Update homework</DialogTitle> : <DialogTitle>Create new homework</DialogTitle>}
                <DialogContent>
                    <TextField
                        error={props.homeworkTitleError}
                        onChange={props.handleTitleChange}
                        label="Title"
                        helperText="Required"
                        required={true}
                        fullWidth={true}
                        autoFocus={true}
                        value={props.homeworkTitle}
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
                            onClick={props.handleAddExercise}
                        >Add new exercise to homework</Button>
                    </DialogActions>
                </Grid>
                <Grid container justify={"center"}>
                    <DialogActions>
                        {props.updateHomeworkWished
                            ?
                            <Button
                                color={"primary"}
                                variant={"raised"}
                                onClick={props.handleCreate}
                            >Update homework</Button>
                            :
                            <Button
                                color={"primary"}
                                variant={"raised"}
                                onClick={props.handleCreate}
                            >Create homework</Button>
                        }
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={props.handleCancel}
                        >Cancel</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </div>
    )
}

export default ModalDialogNewHomework;