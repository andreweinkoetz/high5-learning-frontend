import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import CreateExercise from '../CreateExercise/CreateExercise';

// modal dialog which appears when teacher either want to create a new homework or update one
const ModalDialogNewHomework = (props) => {

    // maps the exercises of a homework into single exercise components, which are shown to the teacher in a list
    let exercises = props.exercises.map(exc => {
            return (
                <CreateExercise
                    key={exc.id}
                    id={exc.id}
                    changeRadioValue={props.handleChangeRadioValue}
                    changeAnswers={props.handleChangeAnswers}
                    radioValue={props.exercises[exc.id-1].rightSolution}
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

    let alreadyAddedHomework = null;
    if(props.selectedClass !== "") { // if a teacher selected a class from which he/she wants to copy a homework ...
        let selecClass = props.availableClasses.find(e => e._id === props.selectedClass); // ... first the selected class is found ...
        alreadyAddedHomework = selecClass.homework.map(h => { // ... then all the homework from the class are mapped to MenuItems component, which are given to the corresponding select component
            return (<MenuItem key={h._id} value={h._id}>{h.title}</MenuItem>)
        })
    }

    let availableClasses = props.availableClasses.map(c => { // maps the available classes of a teacher to MenuItem components, which are given to the corresponding select component
        return (<MenuItem key={c._id} value={c._id}>{c.title}</MenuItem>)
    });

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <Typography variant="subheading" align="left" style={{marginTop: '15px', marginLeft: '20px'}}>Copy previous created homework from classes</Typography>
                <div style={{paddingLeft:20, paddingRight:20, marginTop: 8}}>
                    <FormControl fullWidth>
                        <InputLabel>Selected class</InputLabel>
                        <Select // select component for the classes
                            value={props.selectedClass}
                            onChange={props.changeSelectedClass}>
                            <MenuItem key={"None"} value={""}>None</MenuItem>
                            {availableClasses}
                        </Select>
                    </FormControl>
                </div>
                <div style={{paddingLeft:20, paddingRight:20, marginTop: 8}}>
                    <FormControl fullWidth>
                        <InputLabel>Selected homework</InputLabel>
                        <Select // select component for the homework
                            value={props.selectedHomework}
                            onChange={props.changeSelectedHomework}>
                            <MenuItem key={"None"} value={""}>None</MenuItem>
                            {alreadyAddedHomework}
                        </Select>
                    </FormControl>
                </div>
                <DialogTitle>{props.updateHomeworkWished ? "Update homework" : "Create new homework"}</DialogTitle>
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
                    <div style={{maxHeight:'500px', marginBottom: '10px'}}>
                        {exercises}
                    </div>
                </DialogContent>

                    <DialogActions style={{justifyContent:'center', marginTop:10, marginBottom:5}}>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={props.handleAddExercise}
                        >Add new exercise to homework</Button>
                    </DialogActions>

                    <DialogActions style={{justifyContent:'center', marginBottom:15}}>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={props.handleSubmit}
                        >{props.updateHomeworkWished ? "Update homework" : "Create homework"}</Button>
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={props.handleCancel}
                        >Cancel</Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
};

export default ModalDialogNewHomework;