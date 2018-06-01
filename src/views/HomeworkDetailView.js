import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import ExerciseList from "../components/Exercise/ExerciseList";
import HomeworkService from '../services/HomeworkService';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";


export default class HomeworkDetailView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: '',
            id: '',
            selectedValues: [],
            exercises: [],
            loading: false
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


    render() {

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant={'title'}>Homework: {this.state.title}</Typography>
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
                    <Grid item xs={12}>
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


                </Grid>


            </div>
        );
    }
}