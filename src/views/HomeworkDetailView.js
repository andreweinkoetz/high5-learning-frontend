import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";

import ExerciseList from "../components/Exercise/ExerciseList";
import HomeworkService from '../services/HomeworkService';


export default class HomeworkDetailView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: this.props.location.state.title,
            id: this.props.match.params.id,
            selectedValues: [],
            exercises: [],
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        HomeworkService.getHomeworkDetail(this.state.id).then(homework => {
            const homeworkExercises = [...homework.exercises];

            this.setState({
                exercises: homeworkExercises,
                loading: false
            });
        })
    };

    handleSubmit() {

    };

    handleSelection(event) {

        const newSelection = [...this.state.selectedValues];

        const newValue = event.target.value.split(' ');
        const id = newValue[0];
        const val = newValue[1];

        console.log(id);
        console.log(val);

        newSelection[id] = val;

        console.log(newSelection);

        this.setState({
            selectedValues: newSelection
        });
    }


    render() {

        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant={'title'}>Homework: {this.state.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}><ExerciseList selectedValues={this.state.selectedValues}
                                                     handleSelection={this.handleSelection}
                                                     exercises={this.state.exercises}/></Grid>
                </Grid>

            </div>
        );
    }
}