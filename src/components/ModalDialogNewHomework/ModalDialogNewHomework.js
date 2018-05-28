import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import ErrorDeleteExerciseComponent from '../../components/ErrorDeleteExerciseComponent/ErrorDeleteExerciseComponent';
import CreateExercise from '../CreateExercise/CreateExercise';

class ModalDialogNewHomework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            homeworkTitle: "",
            homeworkTitleError: false,
            exercisesData: [
                {id: "1", exerciseTitle: "", exerciseTitleError: false, rightSolution: "", rightSolutionError: false, solutionPossibilities: [
                                            {a1: ""},
                                            {a2: ""},
                                            {a3: ""},
                                            {a4: ""}
                                            ], solutionPossibilitiesError: [
                        {a1: false},
                        {a2: false},
                        {a3: false},
                        {a4: false}
                    ]
                }
            ],
            errorText: [],
            errorStateFields: false,
            errorStateDeleteExercise: false
        };

    }




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

    handleCreate = () => {
        let errorTextCurrent = [];

        let testHomeworkTitleMissing = this.state.homeworkTitle;
        let updatedState = [...this.state.exercisesData];

        if (testHomeworkTitleMissing === "") {
            errorTextCurrent.push("For this homework the title is missing!");
        }
        let testExerciseTitleMissing = this.state.exercisesData.map(
            e => (e.exerciseTitle === "")
        );

        let testRightSolutionMissing = this.state.exercisesData.map(
            e => (e.rightSolution === "")
        );

        let testSolutionPossibilitiesMissing = this.state.exercisesData.map(
            e => e.solutionPossibilities.map(
                e1 => Object.values(e1)[0] === "" /*with this you get single values of the Objects in array solutionPossibilities*/
            )
        );

        for(let i = 0; i<testExerciseTitleMissing.length;i++) {
            if (testExerciseTitleMissing[i] === true) {
                errorTextCurrent.push("For exercise " + (i + 1) + " the title is missing!");
            }
            updatedState[i].exerciseTitleError = testExerciseTitleMissing[i];
        }

        for(let i = 0; i<testRightSolutionMissing.length;i++) {
            if (testRightSolutionMissing[i] === true) {
                errorTextCurrent.push("For exercise " + (i + 1) + " the right solution is missing!");
            }
            updatedState[i].rightSolutionError = testRightSolutionMissing[i];
        }

        for(let i = 0; i<testSolutionPossibilitiesMissing.length;i++) {
            for(let a = 0; a<testSolutionPossibilitiesMissing[i].length;a++) {
                if(testSolutionPossibilitiesMissing[i][a] === true) {
                    errorTextCurrent.push("For exercise " + (i + 1) + " answer " + (a + 1) + " is missing!");
                }
                Object.assign(updatedState[i].solutionPossibilitiesError[a])["a"+(a+1)] = testSolutionPossibilitiesMissing[i][a];
            }
        }
        this.setState({exercisesData: updatedState, homeworkTitleError: (testHomeworkTitleMissing === ""), errorText: errorTextCurrent, errorStateFields: (errorTextCurrent.length !== 0)});
        if(errorTextCurrent.length === 0) {
            this.props.handleCancel();
        }
    };

    changeRightSolution = (id) => (event) => {
        let r = [...this.state.exercisesData];
        let i = r.find(e => e.id === id);
        i.rightSolution = event.target.value;
        this.setState({exercisesData: r});
    };

    changeSolutionPossibilities = (id, answerID) => (event) => {
        let r = [...this.state.exercisesData];
        let i = r.find(e => e.id === id);
        let s = i.solutionPossibilities[answerID-1];
        let b = "a"+answerID;
        s[b] = event.target.value;
        if (event.target.value !== "") {
            let e = i.solutionPossibilitiesError[answerID-1];
            e[b] = false;
        }
        this.setState({exercisesData: r});
    };

    changeHomeworkTitle = (event) => {
        let t = this.state.homeworkTitle;
        let e = this.state.homeworkTitleError;
        t = event.target.value;
        if (event.target.value !== "") {
            e = false;
        }
        this.setState({homeworkTitle: t, homeworkTitleError: e});
    };

    changeExerciseTitle = (id) => (event) => {
        let r = [...this.state.exercisesData];
        let i = r.find(e => e.id === id);
        i.exerciseTitle = event.target.value;
        if (event.target.value !== "") {
            i.exerciseTitleError = false;
        }
        this.setState({exerciseData: r});
    };

    addExercise = () => {
        let c = [...this.state.exercisesData];
        let n = c.length;
        n = "" + (n + 1);
        c.push({id: n, exerciseTitle: "", exerciseTitleError: false, rightSolution: "", rightSolutionError: false, solutionPossibilities: [
                {a1: ""},
                {a2: ""},
                {a3: ""},
                {a4: ""}
            ], solutionPossibilitiesError: [
                {a1: false},
                {a2: false},
                {a3: false},
                {a4: false}
            ]});
        this.setState({exercisesData: c});
    };

    handleErrorMessageRead = () => {
        this.setState({errorStateFields: false});
    };

    handleDeleteExerciseErrorMessageRead = () => {
        this.setState({errorStateDeleteExercise: false});
    }

    handleDeleteExercise = (id) => {
        let r = [...this.state.exercisesData];
        if (r.length===1) {
            this.setState({errorStateDeleteExercise: true});
        }
        else {
            r.splice(id - 1, 1);
            for (let i = (id - 1); i < r.length; i++) {
                r[i].id = "" + (i + 1);
            }
            this.setState({exercisesData: r});
        }
    };

    render () {

        let exercises = this.state.exercisesData.map(exc => {
                return (
                    <CreateExercise
                        key={exc.id}
                        id={exc.id}
                        changeRadio={this.changeRightSolution}
                        changeAnswers={this.changeSolutionPossibilities}
                        value={this.state.exercisesData.find(e => e.id === exc.id).rightSolution}
                        changeTitle={this.changeExerciseTitle}
                        errorExerciseTitle={this.state.exercisesData[exc.id-1].exerciseTitleError}
                        errorExerciseSolutionPossibilities={this.state.exercisesData[exc.id-1].solutionPossibilitiesError}
                        deleteExercise={this.handleDeleteExercise}
                        answersValues={this.state.exercisesData[exc.id-1].solutionPossibilities}
                        titleValue={this.state.exercisesData[exc.id-1].exerciseTitle}
                    />
                )
            }
        );

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.visible}
                >
                    <DialogTitle>Create new homework</DialogTitle>
                    <DialogContent>
                    <TextField
                        error={this.state.homeworkTitleError}
                        onChange={this.changeHomeworkTitle}
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
                        onClick={this.handleCreate}
                    >Create homework</Button>
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={this.props.handleCancel}
                    >Cancel</Button>
                </DialogActions>
                    </Grid>
                </Dialog>
                <ErrorComponent
                    errorOutputText={this.state.errorText}
                    visible={this.state.errorStateFields}
                    errorMessageRead={this.handleErrorMessageRead}/>
                <ErrorDeleteExerciseComponent
                    visible={this.state.errorStateDeleteExercise}
                    errorDeleteExerciseMessageRead={this.handleDeleteExerciseErrorMessageRead}
                />
            </div>
        )
    }
}

export default ModalDialogNewHomework;