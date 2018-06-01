import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from '@material-ui/core/Paper';

import ExerciseList from "../components/Exercise/ExerciseList";
import HomeworkService from '../services/HomeworkService';
import UserService from '../services/UserService';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from  '@material-ui/core/InputLabel';


export default class HomeworkDetailView extends React.Component {


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
            isTeacher: false,
            selectedStudent: "All",
            studentsOfClass:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

    }

    componentWillMount() {
        this.setState({
            loading: true,
            title: this.props.location.state.title,
            id: this.props.location.state.id
        });

        if (UserService.isTeacher()) {
            this.setState({isTeacher: true});
        }


        HomeworkService.getHomeworkDetail(this.props.location.state.id).then(homework => {
            const homeworkExercises = [...homework.exercises];

            this.setState({
                exercises: homeworkExercises,
                loading: false
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
                link: `homework/${this.props.location.state.title}`,
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

    };

    handleValueSelected = (event) => {
        const newValueSelected = event.target.value;
        console.log(event.target.value);
        this.setState({selectedStudent: newValueSelected});
    };


    render() {

        let statistics =
            <div>
            <Paper elevation={4} style={{marginBottom: '20px', padding: '10px'}}>
                <Grid container spacing={0} direction={"row"}>
                    <Grid item xs={12} sm={6} style={{paddingLeft: '25px', paddingTop: '10px'}}>
                        <Typography variant={"subheading"}>Select: Aggregation level (Required)</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl style={{minWidth: '120px'}}>
                            {/* <InputLabel>Select student</InputLabel> */}
                            <Select value={this.state.selectedStudent} onChange={this.handleValueSelected}>
                                <MenuItem value={"All"}>All</MenuItem>
                                <MenuItem value={"Test"}>Test</MenuItem>
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
                        <Typography variant={"subheading"} style={{paddingLeft:'15px'}}>Overall progress: </Typography>
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
                        <Typography variant={"subheading"} style={{paddingLeft:'15px'}}>Percentage of correct answers: </Typography>
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
            </div>

        let buttonsForStudents = <Grid item xs={12}>
            <Grid container align="center" spacing={8}>
                <Grid item xs={6}>
                    <Button onClick={this.handleBack} size="large" variant="raised"
                            color="secondary">Back</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={this.handleSubmit} size="medium" variant="raised"
                            color="primary">Submit<Icon>send</Icon></Button>
                </Grid>
            </Grid>
        </Grid>

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant={'title'}>Homework: {this.state.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.isTeacher ? statistics : null}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loading ?
                            <div style={{textAlign: 'center', paddingTop: 40, paddingBottom:40}}><CircularProgress size={30}/>
                                <Typography variant={'caption'}>Loading...</Typography></div>
                            : <ExerciseList selectedValues={this.state.selectedValues}
                                            handleSelection={this.handleSelection}
                                            exercises={this.state.exercises}/>}
                    </Grid>
                        {this.state.isTeacher ? null : buttonsForStudents}
                </Grid>
            </div>
        );
    }
}