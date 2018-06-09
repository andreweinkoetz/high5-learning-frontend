import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import ExerciseListSolutionTeacher from '../components/Exercise/ExerciseListSolutionTeacher';
import ExerciseListEmpty from '../components/Exercise/ExerciseListEmpty';
import HomeworkService from '../services/HomeworkService';
import SubmissionService from '../services/SubmissionService';
import ClassService from '../services/ClassService';


export default class HomeworkDetailViewTeacher extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: '',
            id: '',
            exercises: [],
            loading: false,
            exerciseStatistics: [],
            numberOfAssignedStudentsToClass: 0,
            numberOfStudentsSubmitted: 0,
            selectedStudent: "All",
            studentsOfClass: [],
            progressOfStudents: 50,
            percentageCorrectAnswers: 25,
            percentage: [],
            allSubmissions: [],
            selectedSubmission: [],
            empty: false,
            statistics: []

        };
        
        this.handleValueSelected = this.handleValueSelected.bind(this);
    }

    componentWillMount() {
        console.log('classid');

        console.log(this.props.location.state.classId);
        this.setState({
            loading: true,
            title: this.props.location.state.title,
            id: this.props.location.state.id
        });


        //getting homework data like questions and answer posibilities ...
        HomeworkService.getHomeworkDetail(this.props.location.state.id).then(homework => {
            const homeworkExercises = [...homework.exercises];

            this.setState({
                exercises: homeworkExercises,

            });
        })
            .catch(e => this.props.handleException(e))

            .then(() =>
                ClassService.getStudentsOfClass(this.props.location.state.classId)
                    .then(listOfStudents => {
                        const studentList =
                            listOfStudents.map(obj => ({studentId: obj._id, studentName: obj.username}));
                        this.setState({
                            studentsOfClass: studentList
                        });
                    }))

            .then(() => {
                SubmissionService.getSubmissionOfHomework(this.props.location.state.id)
                    .then(submission => {
                        if (submission.submissions.length !== 0) {

                            const exerciseStatistics = [...submission.exerciseStatistics];
                            const newSubmission = [...submission.submissions];
                            const numberOfStudentsSubmitted = submission.studentCount;
                            const numberOfAssignedStudentsToClass = submission.count;

                            this.setState({
                                allSubmissions: newSubmission,
                                exerciseStatistics: exerciseStatistics,
                                numberOfStudentsSubmitted: 4,
                                numberOfAssignedStudentsToClass: 8,
                                loading: false
                            });
                        }
                        else {
                            this.setState({
                                empty: true,
                                loading: false
                            })
                        }
                    });
            })
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

    //window.history.back(1): one step back in history
    handleBack() {
        window.history.back(1);
    };

    handleValueSelected = (event) => {
        const newValueSelected = event.target.value;
        if (event.target.value != 'All') {
            const result = this.state.allSubmissions.filter(x => x.student == event.target.value);
            this.setState({
                selectedStudent: event.target.value,
                selectedSubmission: result[0].exercises
            });
        }
        else {
            this.setState({
                selectedStudent: event.target.value,
                selectedSubmission: []
            });
        }

    };


    render() {

        if (this.state.loading) {
            return <div style={{textAlign: 'center', paddingTop: 40, paddingBottom: 40}}><CircularProgress
                size={30}/>
                <Typography variant={'caption'}>Loading...</Typography></div>;
        }

        /*  let AllSubmissionMenuItem;
          this.state.allSubmissions.length === 0 ? AllSubmissionMenuItem = <MenuItem disabled value={"All"}>All</MenuItem>
              : AllSubmissionMenuItem = <MenuItem value={"All"}>All</MenuItem> */

        let AllSubmissionMenuItem = <MenuItem value={"All"}>All</MenuItem>

        let statistics =
            <div>
                <Paper elevation={4} style={{marginBottom: '20px', padding: '10px'}}>
                    <Grid container spacing={0} direction={"row"}>
                        <Grid item xs={12} sm={6} style={{paddingLeft: '25px', paddingTop: '10px'}}>
                            <Typography variant={"subheading"}>Aggregation level</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{minWidth: '120px'}}>
                                <Select value={this.state.selectedStudent} onChange={this.handleValueSelected}>

                                    /* AllSubmissionMenuItem --> disabled if no submission */
                                    {AllSubmissionMenuItem}

                                    {this.state.studentsOfClass.map((obj, i) => {
                                            return (
                                                /* check if student has submitted a solution - if not disable */
                                                this.state.allSubmissions.filter(x => x.student == obj.studentId).length === 0
                                                    ? <MenuItem disabled key={i}
                                                                value={obj.studentId}>{obj.studentName}</MenuItem>
                                                    : <MenuItem key={i}
                                                                value={obj.studentId}>{obj.studentName}</MenuItem>);
                                        }
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                <Divider/>

                <Paper elevation={4}>
                    <Grid item xs={2} sm={2} style={{paddingLeft: '25px', paddingTop: '10px'}}>
                        <Typography variant={"subheading"}>Statistics</Typography>
                    </Grid>
                    <Grid container spacing={0} style={{padding: '10px'}} alignItems={"center"} direction={"row"}>
                        <Grid item xs={2} sm={2}>
                            <Typography variant={"subheading"} style={{paddingLeft: '15px'}}>Overall
                                progress: </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Typography variant={"body1"}>{this.state.progressOfStudents} %</Typography>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <LinearProgress
                                variant={"determinate"}
                                value={this.state.progressOfStudents}
                                style={{paddingRight: '10px'}}/>
                        </Grid>
                        <Grid item xs={1} sm={1}/>
                        <Grid item xs={2} sm={2}>
                            <Typography variant={"subheading"} style={{paddingLeft: '15px'}}>Percentage of correct
                                answers: </Typography>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <Typography variant={"body1"}>{this.state.percentageCorrectAnswers} %</Typography>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                            <LinearProgress
                                variant={"determinate"}
                                value={this.state.percentageCorrectAnswers}
                                style={{paddingRight: '10px'}}/>
                        </Grid>
                    </Grid>
                </Paper>
            </div>;


        let backButton =
            <Grid item xs={12}>
                <Grid container align="center" spacing={8}>
                    <Grid item xs={12}>
                        <Button onClick={this.handleBack} size="large" variant="raised"
                                color="secondary">Back</Button>
                    </Grid>
                </Grid>
            </Grid>;


        let result;
        (!this.state.empty) ?
            result =
                <ExerciseListSolutionTeacher exercises={this.state.exercises}
                                             percentage={this.state.exerciseStatistics}
                                             selectedStudent={this.state.selectedStudent}
                                             selectedChoice={this.state.selectedSubmission}
                                             empty={this.state.empty}
                />

            :
            result =
                <ExerciseListEmpty exercises={this.state.exercises}
                                   selectedStudent={this.state.selectedStudent}
                                   percentage={[0, 0, 0, 0]}
                                   empty={this.state.empty}
                />


        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant={'title'}>Homework: {this.state.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {statistics}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {result}
                    </Grid>
                    {backButton}
                </Grid>
            </div>
        );
    }
}

HomeworkDetailViewTeacher.propTypes = {

};