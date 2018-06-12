import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import ModalDialogNewHomework from '../components/ModalDialogNewHomework/ModalDialogNewHomework';
import HomeworkList from '../components/Homework/HomeworkList';
import ClassService from "../services/ClassService";
import HomeworkService from '../services/HomeworkService';
import SubmissionService from '../services/SubmissionService';
import UserService from '../services/UserService';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

export default class ClassDetailView extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            loading: false,
            showModal: false,
            homework: [],
            submissions: [],
            ableToDeleteExercises: false,
            errorText: [],
            errorState: false,
            updateHomeworkWished: false,
            idOfToBeUpdatedHomework: "",
            homeworkToAddErrors: {
                title: false,
                exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
            },
            homeworkToAdd:
                {
                    title: "",
                    exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
                    assignedClass: '',
                    visible: false
                },

            currentClass: {
                title: '',
                id: ''
            },
            availableClasses: [],
            selectedClass: "",
            selectedHomework: ""
        };

        this.addNewHomework = this.addNewHomework.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);

    }

    componentWillMount() {
        this.setState({
            loading: true,
            currentClass: {
                title: this.props.location.state.title,
                id: this.props.location.state.id
            }
        });

        ClassService.getAllHomeworkOfUser().then((homework) => {
            this.setState({availableClasses: [...homework]})
        });

        ClassService.getHomeworkOfClass(this.props.location.state.id).then((data) => {
            this.setState({
                homework: [...data.singleClass.homework],
                submissions: [...data.submissions],
                loading: false
            });
        }).catch((e) => {
            this.props.handleNotification(e);
        });

    }

    componentDidMount() {
        this.props.updateBreadcrumb([
            {
                link: `/myclasses`,
                linkName: 'My classes'
            },
            {
                link: `/myclasses/${this.props.location.state.title}`,
                linkName: this.props.location.state.title,
                id: this.props.location.state.id
            }]);
    }

    toggleModal() {
        const oldState = this.state.showModal;
        const homeworkToAddErrorsWhenClickingAdd = {
            title: false,
            exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
        }; // this is needed so that the user sees no previous info from a canceled homework creation
        const homeworkToAddWhenClickingAdd = {
            title: "",
            exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
            assignedClass: "",
            visible: false
        };
        this.setState({
            showModal: !oldState,
            homeworkToAdd: homeworkToAddWhenClickingAdd,
            homeworkToAddErrors: homeworkToAddErrorsWhenClickingAdd,
            errorText: [],
            updateHomeworkWished: false,
            selectedHomework: "",
            selectedClass: "",
            ableToDeleteExercises: false
        });
    }

    handleSubmitModal() {

        let newHomeworkToAdd = {...this.state.homeworkToAdd};

        newHomeworkToAdd.assignedClass = this.state.currentClass.id;

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
            this.props.handleNotification({
                title: 'Some problems found',
                msg: newErrorText.toString(),
                variant: 'warning'
            });
        } else {
            if (this.state.updateHomeworkWished) {
                this.setState({errorText: newErrorText});
                this.updateHomework(newHomeworkToAdd);
            }
            else {
                this.setState({errorText: newErrorText});
                this.addNewHomework(newHomeworkToAdd);
            }
        }
    }

    handleTitleChange(event) {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        newHomework.title = event.target.value;
        let oldErrorState = {...this.state.errorState};
        if (event.target.value !== "") {
            newHomeworkErrors.title = false;
            oldErrorState = false;
        }
        this.setState({
            homeworkToAdd: newHomework,
            homeworkToAddErrors: newHomeworkErrors,
            errorState: oldErrorState
        });
    }

    addNewHomework(homeworkToAdd) {

        HomeworkService.addNewHomework(this.state.currentClass.id, homeworkToAdd).then((newHomework) => {
                const updatedHomework = [...this.state.homework];
                updatedHomework.push(newHomework);

                let availableClasses = [...this.state.availableClasses];
                let updatedClass = availableClasses.find(c => c._id === this.state.currentClass.id);
                updatedClass.homework.push(newHomework);

                this.setState({homework: updatedHomework, availableClasses: availableClasses});
                this.toggleModal();

            }
        ).catch(e => this.props.handleNotification(e));
    }

    updateHomework(homeworkToUpdate) {

        HomeworkService.updateHomework(this.state.idOfToBeUpdatedHomework, homeworkToUpdate).then((updatedHomework) => {
            let newHomework = [...this.state.homework];

            let homeworkToUpdate = newHomework.find(h => h._id === updatedHomework._id);

            homeworkToUpdate.title = updatedHomework.title;
            homeworkToUpdate.exercises = updatedHomework.exercises;

            let availableClasses = [...this.state.availableClasses];
            let updatedClass = availableClasses.find(c => c._id === this.state.currentClass.id);
            let updatedHW =  updatedClass.homework.find(h => h._id === updatedHomework._id);
            updatedHW.title = updatedHomework.title;
            updatedHW.exercises = updatedHomework.exercises;

            this.setState({homework: newHomework, updateHomeworkWished: false, availableClasses: availableClasses});
            this.toggleModal();
        }).catch(e => console.log(e));
    }

    handleExerciseTitleChange = (id) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
        exerciseIDData.question = event.target.value;
        let oldErrorState = {...this.state.errorState};
        if (event.target.value !== "") {
            exerciseIDErrorData.question = false;
            oldErrorState = false;
        }
        this.setState({
            homeworkToAdd: newHomework,
            homeworkToAddErrors: newHomeworkErrors,
            errorState: oldErrorState
        });
    };

    handleChangeRadioValue = (id) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
        exerciseIDData.rightSolution = event.target.value;
        exerciseIDErrorData.rightSolution = true;
        this.setState({homeworkToAdd: newHomework, homeworkToAddErrors: newHomeworkErrors, errorState: false});
    };

    handleChangeAnswers = (id, answerID) => (event) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let exerciseIDData = newHomework.exercises.find(e => e.id === id);
        exerciseIDData.answers[answerID] = event.target.value;
        let oldErrorState = {...this.state.errorState};
        if (event.target.value !== "") {
            let exerciseIDErrorData = newHomeworkErrors.exercises.find(e => e.id === id);
            exerciseIDErrorData.answers[answerID] = false;
            oldErrorState = false;
        }
        this.setState({
            homeworkToAdd: newHomework,
            homeworkToAddErrors: newHomeworkErrors,
            errorState: oldErrorState
        });
    };

    handleAddExercise = () => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        let newHomeworkExercises = [...newHomework.exercises];
        let newHomeworkErrorExercises = [...newHomeworkErrors.exercises];
        let newExerciseID = newHomeworkExercises.length;
        newExerciseID = "" + (newExerciseID + 1);
        newHomeworkExercises.push({id: newExerciseID, question: '', answers: ["", "", "", ""], rightSolution: ""});
        newHomework.exercises = newHomeworkExercises;
        newHomeworkErrorExercises.push({
            id: newExerciseID,
            question: false,
            answers: [false, false, false, false],
            rightSolution: false
        });
        newHomeworkErrors.exercises = newHomeworkErrorExercises;
        this.setState({
            homeworkToAdd: newHomework,
            homeworkToAddErrors: newHomeworkErrors,
            ableToDeleteExercises: true
        }); // when you add an exercise you are always able to delete an exercise
    };

    handleDeleteExercise = (id) => {
        let newHomework = {...this.state.homeworkToAdd};
        let newHomeworkErrors = {...this.state.homeworkToAddErrors};
        newHomework.exercises.splice(id - 1, 1);
        newHomeworkErrors.exercises.splice(id - 1, 1);
        for (let i = (id - 1); i < newHomework.exercises.length; i++) {
            newHomework.exercises[i].id = "" + (i + 1);
            newHomeworkErrors.exercises[i].id = "" + (i + 1);
        }
        const lengthExercises = newHomework.exercises.length;
        let oldAbleToDeleteState = {...this.state.ableToDeleteExercises};
        if (lengthExercises < 2) {
            oldAbleToDeleteState = false;
        }
        this.setState({
            homeworkToAdd: newHomework,
            homeworkToAddErrors: newHomeworkErrors,
            ableToDeleteExercises: oldAbleToDeleteState
        });
    };

    handleDeleteHomework = (id) => {
        HomeworkService.deleteHomework(id)
            .then((data) => {

                let availableClasses = [...this.state.availableClasses];
                let updatedClass = availableClasses.find(c => c._id === this.state.currentClass.id);
                updatedClass.homework = [...data.homework];

                this.setState({
                    homework: [...data.homework],
                    loading: false,
                    availableClasses: availableClasses
                });
            })
            .catch(e => this.props.handleNotification(e));
    };

    handleMakeHomeworkVisible = (id) => {
        const desiredVisibilityStatus = true;
        HomeworkService.changeVisibilityStatus(id, desiredVisibilityStatus)
            .then((data) => {
                this.setState({
                    homework: [...data.homework],
                    loading: false
                });
            })
            .catch(e => console.log(e));
    };

    handleMakeHomeworkInvisble = (id) => {
        const desiredVisibilityStatus = false;
        HomeworkService.changeVisibilityStatus(id, desiredVisibilityStatus)
            .then((data) => {
                this.setState({
                    homework: [...data.homework],
                    loading: false
                });
            })
            .catch(e => console.log(e));
    };

    handleSwitchChange = (id) => (event) => {
        const desiredVisibilityStatus = event.target.checked;
        HomeworkService.changeVisibilityStatus(id, desiredVisibilityStatus)
            .then((data) => {
                this.setState({
                    homework: [...data.homework],
                    loading: false
                });
            })
            .catch(e => console.log(e));
    };

    handleUpdateHomework = (id) => {
        SubmissionService.getSubmissionOfHomework(id).then(submissions => {
            if(submissions.count === 0) {
                HomeworkService.getHomeworkDetail(id).then((homework) => {
                    const homeworkToUpdate = {
                        title: homework.title,
                        exercises: homework.exercises,
                        visible: homework.visible
                    };
                    let ableToDeleteExercisesOfToBeUpdatedHomework = this.state.ableToDeleteExercises;
                    if (homework.exercises.length > 1) {
                        ableToDeleteExercisesOfToBeUpdatedHomework = true;
                    }
                    let homeworkToUpdateErrors = {title: false, exercises: []};
                    homeworkToUpdate.exercises.map(e => {
                        return homeworkToUpdateErrors.exercises.push({ // return here only needed so that no error warning appears
                            id: e.id,
                            question: false,
                            answers: [false, false, false, false],
                            rightSolution: false
                        })
                    });

                    this.setState({
                        homeworkToAddErrors: homeworkToUpdateErrors,
                        homeworkToAdd: homeworkToUpdate,
                        updateHomeworkWished: true,
                        showModal: true,
                        idOfToBeUpdatedHomework: id,
                        ableToDeleteExercises: ableToDeleteExercisesOfToBeUpdatedHomework
                    });
                })
            }
            else {
                this.props.handleNotification({
                    title: 'Updating of class not possible',
                    msg: 'A student has already submitted, so you cannot update the class!',
                    code: 12,
                    variant: 'warning'
                });
            }
        })
    };

    handleHomeworkSelected = (event) => {
        if(event.target.value !== "") {
            const availableClasses = [...this.state.availableClasses];
            const selectedClass = availableClasses.find(c => c._id === this.state.selectedClass);
            const selectedHomework = selectedClass.homework.find(e => e._id === event.target.value);
            this.setState({selectedHomework: selectedHomework._id});
            this.changeSelectedHomework(selectedHomework);
        }
        else {
            this.setState({selectedHomework: "None"});
        }
    };

    handleClassSelected = (event) => {
        if(event.target.value !== "") {
            const availableClasses = [...this.state.availableClasses];
            const selectedClass = availableClasses.find(e => e._id === event.target.value);
            if (selectedClass._id !== this.state.selectedClass) {
                let homeworkToAddErrors=  {
                    title: false,
                    exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
                };

                let homeworkToAdd =
                {
                    title: "",
                    exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
                    assignedClass: '',
                    visible: false
                };

                let ableToDeleteExercises = false;

                this.setState({
                    selectedClass: selectedClass._id,
                    selectedHomework: "",
                    homeworkToAddErrors: homeworkToAddErrors,
                    homeworkToAdd: homeworkToAdd,
                    ableToDeleteExercises: ableToDeleteExercises
                });
            }
        }
        else {
            this.setState({selectedClass: ""});
        }
    };

    changeSelectedHomework = (selectedHomework) => {
        const homeworkToUpdate = {
            title: selectedHomework.title,
            exercises: selectedHomework.exercises,
            visible: false
        };
        let ableToDeleteExercisesOfToBeUpdatedHomework = this.state.ableToDeleteExercises;
        if (selectedHomework.exercises.length > 1) {
            ableToDeleteExercisesOfToBeUpdatedHomework = true;
        }
        let homeworkToUpdateErrors = {title: false, exercises: []};
        homeworkToUpdate.exercises.map(e => {
            return homeworkToUpdateErrors.exercises.push({ // return here only needed so that no error warning appears
                id: e.id,
                question: false,
                answers: [false, false, false, false],
                rightSolution: false
            })
        });

        this.setState({
            homeworkToAddErrors: homeworkToUpdateErrors,
            homeworkToAdd: homeworkToUpdate,
            ableToDeleteExercises: ableToDeleteExercisesOfToBeUpdatedHomework
        });
    };


    render() {

        let addNewHomeworkButton;

        if (UserService.isTeacher()) {
            addNewHomeworkButton = <Grid item xs={6} sm={6} md={6}>
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
            </Grid>;
        } else {
            addNewHomeworkButton = <Grid item xs={6} sm={6} md={6}>
                <Grid container spacing={0} align={'right'}>
                </Grid>
            </Grid>
        }

        let modal = this.state.showModal ? <ModalDialogNewHomework
            changeClass={this.handleClassSelected}
            availableClasses={this.state.availableClasses}
            selectedClass={this.state.selectedClass}
            selectedHomework={this.state.selectedHomework}
            changeHomework={this.handleHomeworkSelected}
            visible={this.state.showModal}
            handleCreate={this.handleSubmitModal}
            handleCancel={this.toggleModal}
            handleTitleChange={this.handleTitleChange}
            handleExerciseQuestionChange={this.handleExerciseTitleChange}
            homeworkTitleError={this.state.homeworkToAddErrors.title}
            exercises={this.state.homeworkToAdd.exercises}
            homeworkTitle={this.state.homeworkToAdd.title}
            exercisesErrors={this.state.homeworkToAddErrors.exercises}
            handleChangeRadioValue={this.handleChangeRadioValue}
            handleChangeAnswers={this.handleChangeAnswers}
            handleAddExercise={this.handleAddExercise}
            handleDeleteExercise={this.handleDeleteExercise}
            ableToDeleteExercises={this.state.ableToDeleteExercises}
            updateHomeworkWished={this.state.updateHomeworkWished}/> : null;

        return (
            <div>
                {modal}
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My homework of {this.state.currentClass.title} </Typography>
                    </Grid>
                    {addNewHomeworkButton}
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loading ?
                            <div style={{textAlign: 'center', paddingTop: 40}}><CircularProgress size={30}/>
                                <Typography variant={'caption'}>Loading...</Typography>
                            </div>
                            : <HomeworkList classId={this.state.currentClass.id}
                                            classTitle={this.state.currentClass.title}
                                            homework={this.state.homework}
                                            deleteHomework={this.handleDeleteHomework}
                                            updateHomework={this.handleUpdateHomework}
                                            makeHomeworkInvisible={this.handleMakeHomeworkInvisble}
                                            makeHomeworkVisible={this.handleMakeHomeworkVisible}
                                            changeSwitch={this.handleSwitchChange}
                                            submissions={this.state.submissions}
                            />}
                    </Grid>
                </Grid>
            </div>
        );
    }
}