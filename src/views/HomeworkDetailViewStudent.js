import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

import ExerciseList from "../components/Exercise/ExerciseList";
import ExerciseListSolutionStudent from "../components/Exercise/ExerciseListSolutionStudent";
import HomeworkService from '../services/HomeworkService';
import UserService from '../services/UserService';
import SubmissionService from '../services/SubmissionService';


export default class HomeworkDetailViewStudent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: '',
            id: '',
            selectedValues: [],
            exercises: [],
            loading: false,
            progressOfStudents: 50,
            percentageCorrectAnswers: 25,
            selectedStudent: "All",
            studentsOfClass: [],
            submitted: false,
            submittedValues: [],

            submissionToAdd: {
                student: "",
                homework: "",
                exercises: []
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.addNewSubmission = this.addNewSubmission.bind(this);

    }

    componentWillMount() {
        this.setState({
            loading: true,
            title: this.props.location.state.title,
            id: this.props.location.state.id
        });

        //check if homework is already submitted by student
        SubmissionService.getSubmissionOfHomeworkOfStudent(this.props.location.state.id).then(submission => {
            if (submission.length !== 0) {
                const submittedValues = [...submission[0].exercises];

                this.setState({
                    submitted: true,
                    submittedValues: submittedValues

                });

            }
        }).catch(e => this.props.handleNotification(e));

        HomeworkService.getHomeworkDetail(this.props.location.state.id).then(homework => {
            const homeworkExercises = [...homework.exercises];

            this.setState({
                exercises: homeworkExercises,
                loading: false
            });
        }).catch(e => this.props.handleNotification(e));
    };

    componentDidMount() {
        this.props.updateBreadcrumb([
            {
                link: `/myclasses`,
                linkName: 'My classes'
            },
            {
                link: `/myclasses/${this.props.location.state.classTitle}/`,
                linkName: this.props.location.state.classTitle,
                id: this.props.location.state.classId
            },
            {
                link: `${this.props.location.state.title}`,
                linkName: this.props.location.state.title,
                id: this.props.location.state.id
            }]);
    }

    handleSelection(event) {

        const newSelection = [...this.state.selectedValues];

        const newValue = event.target.value.split(' ');
        const id = newValue[0];
        const val = newValue[1];

        newSelection[id] = val;

        this.setState({
            selectedValues: newSelection
        });
    }

    //window.history.back(1): one step back in history
    handleBack() {
        window.history.back(1);
    };


    handleSubmit() {
        //check if the student has filled out all exercises
        if (this.state.selectedValues.length.toString() === this.state.exercises.length.toString()) {


            const userId = UserService.getCurrentUser().id;
            const submissionToAdd = {...this.state.submissionToAdd};
            submissionToAdd.exercises = this.state.selectedValues;
            submissionToAdd.student = userId;
            submissionToAdd.homework = this.state.id;
            this.addNewSubmission(submissionToAdd);

            //prepare notification
            let countRightSolution = 0;
            let countExercises = this.state.exercises.length;
            this.state.exercises.forEach((elem, index) => {
                if (elem.rightSolution.toString() === this.state.selectedValues[index].toString()) {
                    countRightSolution++;
                }
            });

            //here setting state to rerender in order to get to student submission after pressing submit
            this.setState({
                submitted: true,
                submittedValues: submissionToAdd.exercises
            });

            this.props.handleNotification({
                title: 'Your result',
                msg: `${countRightSolution} of ${countExercises} exercises are correct!`,
                variant: 'info'
            })
        }
        else {
            this.props.handleNotification({
                title: 'Submission not possible',
                msg: `Please do all exercises!`,
                variant: 'error'
            })
        }
    };


//calls SubmissionService and adds new submission to the database
    addNewSubmission(submissionToAdd) {
        SubmissionService.addNewSubmission(submissionToAdd)
            .then(submissionToAdd => console.log('test'))
            .catch(e => alert(e));

    };

    render() {

        let buttonsForStudents = <Grid item xs={12}>
            <Grid container align="center" spacing={8}>
                <Grid item xs={6}>
                    <Button onClick={this.handleBack} size="large" variant="raised"
                            color="secondary">Back</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button disabled={this.state.submitted ? true : false} onClick={this.handleSubmit} size="medium"
                            variant="raised"
                            color="primary">Submit<Icon>send</Icon></Button>
                </Grid>
            </Grid>
        </Grid>;

        let loading;
        if (this.state.loading) {
            loading = <div style={{textAlign: 'center', paddingTop: 40, paddingBottom: 40}}><CircularProgress
                size={30}/>
                <Typography variant={'caption'}>Loading...</Typography></div>;
        }

        let notSubmitted;
        if (!this.state.submitted) {
            notSubmitted = <ExerciseList selectedValues={this.state.selectedValues}
                                         handleSelection={this.handleSelection}
                                         exercises={this.state.exercises}/>;
        }

        let submitted;
        if (this.state.submitted) {
            submitted = <ExerciseListSolutionStudent exercises={this.state.exercises}
                                                     selectedChoice={this.state.submittedValues}/>
        }

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12} style={{minHeight:56}}>
                        <Typography variant={'title'}>Homework: {this.state.title}</Typography>
                        <Typography variant={'caption'}>Please do your homework alone and in a quiet environment.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {loading}
                        {notSubmitted}
                        {submitted}
                    </Grid>
                    {UserService.isTeacher() ? null : buttonsForStudents}
                </Grid>
            </div>
        );
    }
}