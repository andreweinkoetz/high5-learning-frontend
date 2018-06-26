import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import ModalDialogHomework from '../components/ModalDialogHomework/ModalDialogHomework';
import HomeworkList from '../components/Homework/HomeworkList';
import ClassService from "../services/ClassService";
import HomeworkService from '../services/HomeworkService';
import SubmissionService from '../services/SubmissionService';
import UserService from '../services/UserService';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

// Detail component for displaying all information for one specific class
// Contains a list of homework
export default class ClassDetailView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showModal: false, // determines whether the modal dialog for creating or updating a homework is shown
            homework: [], // array of homework of the class
            submissions: [], // array of submissions of all homework of the class
            ableToDeleteExercises: false, // determines, whether the teacher is able to delete an exercise in a homework (only possible, when there are at least two exercises)
            errorText: [], // array with string messages which are shown to the teacher, when he/she forgot a required field when creating/updating a homework
            updateHomeworkWished: false, // determines whether the teacher wants to update a homework
            idOfToBeUpdatedHomework: "", // saves the id of the be updated homework (if there is one), needed so that the backend knows which homework to update
            homeworkModal: { // information of the to be added or updated class from modal dialog
                title: "",
                exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
                assignedClass: '', // needed for backend
                visible: false // set to false initially, so that students can't see the homework in the beginning
            },
            homeworkModalErrors: { // saves whether something in the homework of the modal dialog is wrong, meaning a required field is forgotten. Needed so that the forgotten required fields set their error states to true (the text becomes red)
                title: false,
                exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
            },
            currentClass: { // info of the current viewed class
                title: '',
                id: ''
            },
            availableClasses: [], // array with all classes with all homework of the teacher, needed in component ModalDialogHomework when a teacher wants to use a previous created homework as basis to create a new one
            selectedClass: "", // used in component ModalDialogHomework, currently selected class in select field
            selectedHomework: "", // used in component ModalDialogHomework, currently selected homework in select field
            homeworkRanking: undefined
        };

    }

    componentWillMount() {
        this.setState({
            loading: true,
            currentClass: { // current class is set
                title: this.props.location.state.title,
                id: this.props.location.state.id
            }
        });

        if (UserService.isTeacher()) {
            ClassService.getAllHomeworkOfUser().then((homework) => { // used for creating new homework based on previous created ones (downshift)
                this.setState({availableClasses: [...homework]})
            }).catch((e) => this.props.handleNotification(e));
        }

        ClassService.getHomeworkOfClass(this.props.location.state.id)
            .then((data) => { // returns list of homework within this class
                this.setState({
                    homework: [...data.singleClass.homework],
                    submissions: [...data.submissions],
                    loading: false
                });
                if (UserService.isTeacher()) {
                    return undefined; // teachers have no submissions so the following methods are student-only
                }
                return SubmissionService.getRankingOfSubmissions(this.state.currentClass.id); // key-value (homeworkId, rankingPosition (based on submission date))
            })
            .then((homeworkRanking) => {
                this.setState({homeworkRanking: homeworkRanking})
            }).catch((e) => this.props.handleNotification(e));

    }

    componentDidUpdate() { // needed so that you can navigate through multiple homework each after another
        if (this.props.location.state.id !== this.state.currentClass.id) { // if you switch from one class to another through the navbar, update all info for the current class and its homework
            this.setState({
                loading: true,
                currentClass: {
                    title: this.props.location.state.title,
                    id: this.props.location.state.id
                }
            });

            ClassService.getAllHomeworkOfUser()
                .then((homework) => {
                    this.setState({availableClasses: [...homework]})
                }).catch((e) => this.props.handleNotification(e));

            this.props.updateBreadcrumb([ // update also the breadcrumbs
                {
                    link: `/myclasses`,
                    linkName: 'My classes'
                },
                {
                    link: `/myclasses/${this.props.location.state.title}`,
                    linkName: this.props.location.state.title,
                    id: this.props.location.state.id
                }]);

            ClassService.getHomeworkOfClass(this.props.location.state.id)
                .then((data) => {
                    this.setState({
                        homework: [...data.singleClass.homework],
                        submissions: [...data.submissions],
                        loading: false
                    });
                }).catch((e) => this.props.handleNotification(e));
        }
    }

    componentDidMount() {
        this.props.updateBreadcrumb([ // update the breadcrumbs after mounting the component
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

    toggleModal = () => { // toggles modal, either shows it or let it disappear, depending on context
        const oldState = this.state.showModal;
        const homeworkModalErrors = { // this is needed so that the user sees no previous info from a cancelled or submitted homework creation
            title: false,
            exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
        };

        const homeworkModal = { // this is needed so that the user sees no previous info from a cancelled or submitted homework creation
            title: "",
            exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
            assignedClass: "",
            visible: false
        };

        this.setState({
            showModal: !oldState,
            homeworkModal: homeworkModal, // all these states below (including this) are set to their initial values
            homeworkModalErrors: homeworkModalErrors,
            errorText: [],
            updateHomeworkWished: false,
            selectedHomework: "",
            selectedClass: "",
            ableToDeleteExercises: false
        });
    };

    handleSubmitModal = () => { // invoked when a teacher wants to submit a homework (meaning creating or updating one)
        // in this function it is checked, whether some of the required fields of the to be added/updated homework are missing
        // if some of the required fields are missing, the corresponding error state is set to true and an error message is
        // pushed into errorText
        let homeworkModal = {...this.state.homeworkModal};

        homeworkModal.assignedClass = this.state.currentClass.id;

        let newErrorText = [];

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorsExercises = [...homeworkModalErrors.exercises];

        if (homeworkModal.title === "") {
            homeworkModalErrors.title = true;
            newErrorText.push("For this homework the title is missing!");
        }

        for (let i = 0; i < homeworkModal.exercises.length; i++) {
            if (homeworkModal.exercises[i].question === "") {
                newErrorText.push("For exercise " + (i + 1) + " the question is missing!");
            }
            homeworkModalErrorsExercises[i].question = (homeworkModal.exercises[i].question === "");
        }

        for (let i = 0; i < homeworkModal.exercises.length; i++) {
            if (homeworkModal.exercises[i].rightSolution === "") {
                newErrorText.push("For exercise " + (i + 1) + " the right solution is missing!");
            }
            homeworkModalErrorsExercises[i].rightSolution = (homeworkModal.exercises[i].rightSolution === "");
        }

        for (let i = 0; i < homeworkModal.exercises.length; i++) {
            for (let a = 0; a < homeworkModal.exercises[i].answers.length; a++) {
                if (homeworkModal.exercises[i].answers[a] === "") {
                    newErrorText.push("For exercise " + (i + 1) + " answer " + (a + 1) + " is missing!");
                }
                homeworkModalErrorsExercises[i].answers[a] = (homeworkModal.exercises[i].answers[a] === "");
            }
        }

        homeworkModalErrors.exercises = homeworkModalErrorsExercises;

        if (newErrorText.length !== 0) { // if errors where found, then newErrorText is not empty ...
            this.setState({homeworkModalErrors: homeworkModalErrors}); // ... and the corresponding error states are set and a notification is shown
            this.props.handleNotification({
                title: 'Some problems found',
                msg: newErrorText.toString(),
                variant: 'warning'
            });
        } else { // if no errors where found ...
            if (this.state.updateHomeworkWished) { // ... and the homework should be updated...
                this.setState({errorText: newErrorText}); // this is needed, so that a previous not empty errorText (because of errors) becomes empty (meaning no errors found)
                this.updateHomework(homeworkModal); // ... update the homework
            }
            else { // ... else add the new homework
                this.setState({errorText: newErrorText}); // this is needed, so that a previous not empty errorText (because of errors) becomes empty (meaning no errors found)
                this.addNewHomework(homeworkModal);
            }
        }
    };

    handleTitleChange = (event) => { // invoked, when title is changed of homework, sets homework title

        let homeworkModal = {...this.state.homeworkModal};
        homeworkModal.title = event.target.value;

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        if (event.target.value !== "") { // when there is a title, the error state of the title becomes false
            homeworkModalErrors.title = false;
        }

        this.setState({
            homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors
        });
    };

    addNewHomework = (homeworkToAdd)  => { // invoked, when teacher wants to add a new homework

        HomeworkService.addNewHomework(this.state.currentClass.id, homeworkToAdd) // sent the to be added homework to the backend...
            .then((newHomework) => { // ... and when successfully added the homework, update all corresponding states
                const updatedHomework = [...this.state.homework];
                updatedHomework.push(newHomework);

                let availableClasses = [...this.state.availableClasses];
                let updatedClass = availableClasses.find(c => c._id === this.state.currentClass.id);
                updatedClass.homework.push(newHomework);

                this.setState({
                    homework: updatedHomework,
                    availableClasses: availableClasses
                });

                this.toggleModal(); // close modal dialog
            }).catch(e => this.props.handleNotification(e));
    };

    updateHomework = (homeworkToUpdate) => { // invoked, when teacher wants to update a homework

        HomeworkService.updateHomework(this.state.idOfToBeUpdatedHomework, homeworkToUpdate) // sent the to be updated homework to the backend...
            .then((updatedHomework) => { // ... and when successfully updated the homework, update all corresponding states

                let newHomework = [...this.state.homework];
                let homeworkToUpdate = newHomework.find(h => h._id === updatedHomework._id);
                homeworkToUpdate.title = updatedHomework.title;
                homeworkToUpdate.exercises = updatedHomework.exercises;

                let availableClasses = [...this.state.availableClasses];
                let updatedClass = availableClasses.find(c => c._id === this.state.currentClass.id);
                let updatedHW = updatedClass.homework.find(h => h._id === updatedHomework._id);
                updatedHW.title = updatedHomework.title;
                updatedHW.exercises = updatedHomework.exercises;

                this.setState({
                    homework: newHomework,
                    updateHomeworkWished: false, // set updateHomeworkWished to initial value (false)
                    availableClasses: availableClasses
                });

                this.toggleModal(); // close modal dialog
            }).catch(e => console.log(e));
    };

    handleExerciseTitleChange = (id) => (event) => { // invoked, when teacher changes a title of an exercise, with id you find the exercise whose title you change

        let homeworkModal = {...this.state.homeworkModal};
        let homeworkModalExercises = [...homeworkModal.exercises];
        let exerciseIDData = homeworkModalExercises.find(e => e.id === id);
        exerciseIDData.question = event.target.value;
        homeworkModalExercises.exercises = homeworkModalExercises;

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorsExercises = [...homeworkModalErrors.exercises];
        let exerciseIDErrorData = homeworkModalErrorsExercises.find(e => e.id === id);
        if (event.target.value !== "") { // when there is a title, the error state of the exercise title becomes false
            exerciseIDErrorData.question = false;
        }
        homeworkModalErrors.exercises = homeworkModalErrorsExercises;

        this.setState({
            homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors
        });
    };

    handleChangeRadioValue = (id) => (event) => { // invoked, when teacher changes the radio value (right answer) of an exercise, with id you find the exercise whose right answer you change

        let homeworkModal = {...this.state.homeworkModal};
        let homeworkModalExercises = [...homeworkModal.exercises];
        let exerciseIDData = homeworkModalExercises.find(e => e.id === id);
        exerciseIDData.rightSolution = event.target.value;
        homeworkModal.exercises = homeworkModalExercises;

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorsExercises = [...homeworkModalErrors.exercises];
        let exerciseIDErrorData = homeworkModalErrorsExercises.find(e => e.id === id);
        exerciseIDErrorData.rightSolution = true;
        homeworkModalErrors.exercises = homeworkModalErrorsExercises;

        this.setState({
            homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors
        });
    };

    handleChangeAnswers = (id, answerID) => (event) => { // invoked, when teacher changes an answer of an exercise, with id you find the exercise and with answerID the answer you change

        console.log(this.state.homeworkModal);
        let homeworkModal = {...this.state.homeworkModal};
        let homeworkModalExercises = [...homeworkModal.exercises];
        let exerciseIDData = homeworkModalExercises.find(e => e.id === id);
        exerciseIDData.answers[answerID] = event.target.value;

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorsExercises = [...homeworkModalErrors.exercises];
        if (event.target.value !== "") { // when there is an answer, the error state of the answer of the exercise becomes false
            let exerciseIDErrorData = homeworkModalErrorsExercises.find(e => e.id === id);
            exerciseIDErrorData.answers[answerID] = false;
        }

        console.log(this.state.homeworkModal);
        this.setState({
            //homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors
        });
    };

    handleAddExercise = () => { // invoked, when teacher wants to add a new exercise to a homework (comes from ModalDialogHomework component)

        let homeworkModal = {...this.state.homeworkModal};
        let homeworkModalExercises = [...homeworkModal.exercises];
        let newExerciseID = homeworkModalExercises.length;
        newExerciseID = "" + (newExerciseID + 1);
        homeworkModalExercises.push({ // new exercise is pushed
            id: newExerciseID,
            question: '',
            answers: ["", "", "", ""],
            rightSolution: ""
        });
        homeworkModal.exercises = homeworkModalExercises;

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorExercises = [...homeworkModalErrors.exercises];
        homeworkModalErrorExercises.push({ // new exercise is pushed
            id: newExerciseID,
            question: false,
            answers: [false, false, false, false],
            rightSolution: false
        });
        homeworkModalErrors.exercises = homeworkModalErrorExercises;

        this.setState({
            homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors,
            ableToDeleteExercises: true // when you add an exercise you are always able to delete an exercise
        });
    };

    handleDeleteExercise = (id) => { // invoked, when teacher wants to delete an exercise from a homework (comes from ModalDialogHomework), with id you find the exercise the teacher wants to delete

        let homeworkModal = {...this.state.homeworkModal};
        let homeworkModalExercises = [...homeworkModal.exercises];
        homeworkModalExercises.splice(id - 1, 1);

        let homeworkModalErrors = {...this.state.homeworkModalErrors};
        let homeworkModalErrorExercises = [...homeworkModalErrors.exercises];
        homeworkModalErrorExercises.splice(id - 1, 1);

        for (let i = (id - 1); i < homeworkModalExercises.length; i++) {
            homeworkModalExercises[i].id = "" + (i + 1);
            homeworkModalErrorExercises[i].id = "" + (i + 1);
        }

        homeworkModal.exercises = homeworkModalExercises;
        homeworkModalErrors.exercises = homeworkModalErrorExercises;

        const lengthExercises = homeworkModal.exercises.length;
        let oldAbleToDeleteState = {...this.state.ableToDeleteExercises};
        if (lengthExercises < 2) { // determine whether you are allowed to delete an exercise (more than one exercise in a homework is needed)
            oldAbleToDeleteState = false;
        }

        this.setState({
            homeworkModal: homeworkModal,
            homeworkModalErrors: homeworkModalErrors,
            ableToDeleteExercises: oldAbleToDeleteState
        });
    };

    handleDeleteHomework = (id) => { // invoked, when teacher wants to delete a homework (comes from single Homework components), with id you find the homework the teacher wants to delete

        HomeworkService.deleteHomework(id) // send the id of the to be deleted homework to the backend...
            .then((data) => { // ... and if successful, update all corresponding states

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

    handleSwitchChange = (id) => (event) => { // invoked, when teacher wants to make the homework visible or invisible to students (comes from single Homework component), with id you find the homework you want to make visible/invisible
        const desiredVisibilityStatus = event.target.checked;
        HomeworkService.changeVisibilityStatus(id, desiredVisibilityStatus) // send data to backend ...
            .then((data) => { // ... if successful, update homework
                this.setState({
                    homework: [...data.homework],
                    loading: false
                });
            }).catch(e => this.props.handleNotification(e));
    };

    handleUpdateHomework = (id) => { // invoked, when teacher wants to update a homework, with id you find the homework you want to update
        SubmissionService.getSubmissionOfHomework(id) // get submissions of the homework
            .then(submissions => {
            if (submissions.count === 0) { // if there are no submissions, you can update the homework
                HomeworkService.getHomeworkDetail(id) // get the info of the to be updated homework and set the corresponding states
                    .then((homework) => {

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
                            homeworkModalErrors: homeworkToUpdateErrors,
                            homeworkModal: homeworkToUpdate,
                            updateHomeworkWished: true,
                            showModal: true, // show modal dialog
                            idOfToBeUpdatedHomework: id,
                            ableToDeleteExercises: ableToDeleteExercisesOfToBeUpdatedHomework
                        });
                }).catch(e => this.props.handleNotification(e));
            }
            else { // if homework already has a submission, show notification
                this.props.handleNotification({
                    title: 'Updating of class not possible',
                    msg: 'A student has already submitted, so you cannot update the class!',
                    code: 12,
                    variant: 'warning'
                });
            }
        }).catch(e => this.props.handleNotification(e));
    };

    handleHomeworkSelected = (event) => { // invoked, when teacher selects homework from select component in ModalDialogHomework
        if (event.target.value !== "") { // if a homework is selected, update the corresponding state
            const availableClasses = [...this.state.availableClasses];
            const selectedClass = availableClasses.find(c => c._id === this.state.selectedClass);
            const selectedHomework = selectedClass.homework.find(e => e._id === event.target.value);

            const homeworkModal = {
                title: selectedHomework.title,
                exercises: selectedHomework.exercises,
                visible: false
            };

            let ableToDeleteExercisesOfToBeUpdatedHomework = this.state.ableToDeleteExercises;
            if (selectedHomework.exercises.length > 1) {
                ableToDeleteExercisesOfToBeUpdatedHomework = true;
            }

            let homeworkModalErrors = {title: false, exercises: []};
            homeworkModal.exercises.map(e => {
                return homeworkModalErrors.exercises.push({ // return here only needed so that no error warning appears
                    id: e.id,
                    question: false,
                    answers: [false, false, false, false],
                    rightSolution: false
                })
            });

            this.setState({
                homeworkModalErrors: homeworkModalErrors,
                homeworkModal: homeworkModal,
                ableToDeleteExercises: ableToDeleteExercisesOfToBeUpdatedHomework,
                selectedHomework: selectedHomework._id
            });

        }
        else { // if no homework is selected, set values of homework to initial (meaning empty)

            let homeworkModalErrors = {
                title: false,
                exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
            };

            let homeworkModal = {
                title: "",
                exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
                assignedClass: '',
                visible: false
            };

            let ableToDeleteExercises = false;

            this.setState({
                selectedHomework: "",
                homeworkModalErrors: homeworkModalErrors,
                homeworkModal: homeworkModal,
                ableToDeleteExercises: ableToDeleteExercises
            });
        }
    };

    handleClassSelected = (event) => { // invoked, when teacher selects class from select component in ModalDialogHomework
        // if a class is selected, update the corresponding state
            const availableClasses = [...this.state.availableClasses];

            let selectedClass;
            if (event.target.value === "") {
                selectedClass = {_id: ""}; // if none ("") is chose, selected class is given an id which can never be the same as selectedClass and therefore the exercises of the modal dialog are set to initial
            }
            else {
                selectedClass = availableClasses.find(e => e._id === event.target.value);
            }
            if (selectedClass._id !== this.state.selectedClass) { // if another class is selected than currently selectedClass

                let homeworkModalErrors = {
                    title: false,
                    exercises: [{id: "1", question: false, answers: [false, false, false, false], rightSolution: false}]
                };

                let homeworkModal = {
                    title: "",
                    exercises: [{id: "1", question: "", answers: ["", "", "", ""], rightSolution: ""}],
                    assignedClass: '',
                    visible: false
                };

                let ableToDeleteExercises = false;

                this.setState({
                    selectedClass: selectedClass._id,
                    selectedHomework: "",
                    homeworkModalErrors: homeworkModalErrors,
                    homeworkModal: homeworkModal,
                    ableToDeleteExercises: ableToDeleteExercises
                });
            }
    };

    render() {

        let addNewHomeworkButton = null; // This button is only available for teachers

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
        }

        let modal = this.state.showModal && <ModalDialogHomework
            visible={this.state.showModal}
            homeworkModalErrors={this.state.homeworkModalErrors}
            homeworkModal={this.state.homeworkModal}
            ableToDeleteExercises={this.state.ableToDeleteExercises}
            updateHomeworkWished={this.state.updateHomeworkWished}

            availableClasses={this.state.availableClasses}
            selectedClass={this.state.selectedClass}
            selectedHomework={this.state.selectedHomework}
            changeSelectedClass={this.handleClassSelected}
            changeSelectedHomework={this.handleHomeworkSelected}

            handleSubmit={this.handleSubmitModal}
            handleCancel={this.toggleModal}
            handleTitleChange={this.handleTitleChange}
            handleExerciseQuestionChange={this.handleExerciseTitleChange}
            handleChangeRadioValue={this.handleChangeRadioValue}
            handleChangeAnswers={this.handleChangeAnswers}
            handleAddExercise={this.handleAddExercise}
            handleDeleteExercise={this.handleDeleteExercise}/>;

        return (
            <div>
                {modal}
                <Grid container spacing={16}>
                    <Grid item xs={addNewHomeworkButton ? 6 : 12} sm={6} md={6}>
                        <Typography variant={'title'}>My homework</Typography>
                        <Typography variant={'caption'}>This your homework in
                            class: {this.state.currentClass.title} </Typography>
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
                            : <HomeworkList // here the list comp is called to display all homework of a class in panels
                                classId={this.state.currentClass.id}
                                classTitle={this.state.currentClass.title}
                                homework={this.state.homework}
                                deleteHomework={this.handleDeleteHomework}
                                updateHomework={this.handleUpdateHomework}
                                changeSwitch={this.handleSwitchChange}
                                submissions={this.state.submissions}
                                homeworkRanking={this.state.homeworkRanking}
                            />}
                    </Grid>
                </Grid>
            </div>
        );
    }
}