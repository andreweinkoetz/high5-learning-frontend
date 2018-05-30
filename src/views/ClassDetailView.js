import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import ModalDialogNewHomework from '../components/ModalDialogNewHomework/ModalDialogNewHomework';
import ErrorDeleteExerciseComponent from '../components/ErrorDeleteExerciseComponent/ErrorDeleteExerciseComponent';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import HomeworkList from '../components/Homework/HomeworkList';
import ClassService from "../services/ClassService";
import HomeworkService from '../services/HomeworkService';

export default class ClassDetailView extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            loading: false,
            showModal: false,
            homework: [],

            errorText: [],
            errorStateFields: false,
            errorStateDeleteExercise: false,
            homeworkToAddErrors: {
                title: false,
                exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
            },

            homeworkToAdd:
                {title: "", exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}]},
            currentClass: {
                title: this.props.location.state.title,
                id: this.props.match.params.id
            }
        };

        this.addNewHomework = this.addNewHomework.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ClassService.getHomeworkOfClass(this.props.match.params.id).then((data) => {
            this.setState({
                homework: [...data.homework],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    toggleModal() {
        const oldState = this.state.showModal;
        const homeworkToAddErrorsWhenClickingAdd = {
            title: false,
            exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
        }; // this is needed so that the user sees no previous info from a canceled homework creation
        const homeworkToAddWhenClickingAdd = {
            title: "",
            exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}]
        };
        this.setState({
            showModal: !oldState,
            homeworkToAdd: homeworkToAddWhenClickingAdd,
            homeworkToAddErrors: homeworkToAddErrorsWhenClickingAdd
        });
    }

    handleSubmitModal() {

        let newHomeworkToAdd = {...this.state.homeworkToAdd};


        let newErrorText = [];
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};

        if (newHomeworkToAdd.title === "") {
            newHomeworkErrors.title = true;
            newErrorText.push("For this homework the title is missing!");
        }

        for (let i = 0; i < newHomeworkToAdd.exercises.length; i++) {
            if (newHomeworkToAdd.exercises[i].question === "") {
                newErrorText.push("For exercise " + (i + 1) + " the question is missing!");
            }
            newHomeworkErrors.exercises[i].question = (newHomeworkToAdd.exercises[i].question === "");
        }

        for (let i = 0; i < newHomeworkToAdd.exercises.length; i++) {
            if (newHomeworkToAdd.exercises[i].rightSolution === "") {
                newErrorText.push("For exercise " + (i + 1) + " the right solution is missing!");
            }
            newHomeworkErrors.exercises[i].rightSolution = (newHomeworkToAdd.exercises[i].rightSolution === "");
        }

        for (let i = 0; i < newHomeworkToAdd.exercises.length; i++) {
            for (let a = 0; a < newHomeworkToAdd.exercises[i].answers.length; a++) {
                if (newHomeworkToAdd.exercises[i].answers[a] === "") {
                    newErrorText.push("For exercise " + (i + 1) + " answer " + (a + 1) + " is missing!");
                }
                newHomeworkErrors.exercises[i].answers[a] = (newHomeworkToAdd.exercises[i].answers[a] === "");
            }
        }

        if (newErrorText.length !== 0) {
            this.setState({errorStateFields: true, errorText: newErrorText, homeworkToAddErrors: newHomeworkErrors});
        } else {
            this.setState({errorText: newErrorText});
            this.addNewHomework(newHomeworkToAdd);
        }
    }

    handleTitleChange(event) {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        newHomework.title = event.target.value;
        if (event.target.value !== "") {
            newHomeworkErrors.title = false;
        }
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
    }

    addNewHomework(homeworkToAdd) {

        HomeworkService.addNewHomework(this.state.currentClass.id, homeworkToAdd).then((newHomework) => {
                const updatedHomework = [...this.state.homework];
                updatedHomework.push(newHomework);

                this.setState({homework: updatedHomework});
                this.toggleModal();

            }
        ).catch(e => alert(e));
    }

    handleExerciseTitleChange = (id) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
        exerciseIDData.question = event.target.value;
        if (event.target.value !== "") {
            exerciseIDErrorData.question = false;
        }
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
    };

    handleChangeRadioValue = (id) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
        exerciseIDData.rightSolution = event.target.value;
        exerciseIDErrorData.rightSolution = true;
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
    };

    handleChangeAnswers = (id, answerID) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        exerciseIDData.answers[answerID] = event.target.value;
        if (event.target.value !== "") {
            let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
            exerciseIDErrorData.answers[answerID] = false;
        }
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
    };

    handleAddExercise = () => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let newHomeworkExercises = newHomework.exercises;
        let newHomeworkErrorExercises = newHomeworkErrors.exercises;
        let newExerciseID = newHomeworkExercises.length;
        newExerciseID = "" + (newExerciseID + 1);
        newHomeworkExercises.push({id: newExerciseID, question: '', answers: ["", "", "", ""], rightSolution: ""});
        newHomeworkErrorExercises.push({
            id: newExerciseID,
            question: false,
            answers: [false, false, false, false],
            rightSolution: false
        });
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
    };

    handleDeleteExercise = (id) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        if (newHomework.exercises.length === 1) {
            this.setState({errorStateDeleteExercise: true});
        }
        else {
            newHomework.exercises.splice(id - 1, 1);
            newHomeworkErrors.exercises.splice(id - 1, 1);
            for (let i = (id - 1); i < newHomework.exercises.length; i++) {
                newHomework.exercises[i].id = "" + (i + 1);
                newHomeworkErrors.exercises[i].id = "" + (i + 1);
            }
            this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors});
        }
    };

    handleDeleteExerciseErrorMessageRead = () => {
        this.setState({errorStateDeleteExercise: false});
    };

    handleErrorMessageRead = () => {
        this.setState({errorStateFields: false});
    };

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <ModalDialogNewHomework
                    visible={this.state.showModal}
                    handleCreate={this.handleSubmitModal}
                    handleCancel={this.toggleModal}
                    handleTitleChange={this.handleTitleChange}
                    handleExerciseQuestionChange={this.handleExerciseTitleChange}
                    homeworkTitleError={this.state.homeworkToAddErrors.title}
                    exercises={this.state.homeworkToAdd.exercises}
                    exercisesErrors={this.state.homeworkToAddErrors.exercises}
                    handleChangeRadioValue={this.handleChangeRadioValue}
                    handleChangeAnswers={this.handleChangeAnswers}
                    handleAddExercise={this.handleAddExercise}
                    handleDeleteExercise={this.handleDeleteExercise}/>
                <ErrorDeleteExerciseComponent
                    visible={this.state.errorStateDeleteExercise}
                    errorDeleteExerciseMessageRead={this.handleDeleteExerciseErrorMessageRead}
                />
                <ErrorComponent
                    errorOutputText={this.state.errorText}
                    visible={this.state.errorStateFields}
                    errorMessageRead={this.handleErrorMessageRead}/>
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My homework of {this.state.currentClass.title} </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Grid container spacing={0} align={'right'}>
                            <Grid item xs={12}>
                                <Hidden only={'xs'}>
                                    <Button variant="raised" color="primary" onClick={this.toggleModal}>
                                        <AddIcon/>
                                        Add new homework</Button>
                                </Hidden>
                                <Hidden smUp>
                                    <Button variant="fab" color="primary" aria-label="add" onClick={this.toggleModal}>
                                        <AddIcon/>
                                    </Button>
                                </Hidden>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}><HomeworkList homework={this.state.homework} /> </Grid>
                </Grid>

            </div>
        );
    }
}