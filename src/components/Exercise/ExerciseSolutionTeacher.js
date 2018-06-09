import React from 'react';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Grid from '@material-ui/core/Grid';

import './ExerciseSolution.css';

const Exercise = (props) => {
    console.log(props.selectedStudent);
    console.log(props.rightAnswerPercentage);

    let className;
    if(props.empty) {
        className = "empty";
    }
    else if(props.selectedStudent !== "All" && props.rightSolution == props.selectedChoice) {
        className = "right";
    }
    else if(props.selectedStudent !== "All" && props.rightSolution != props.selectedChoice) {
        className = "wrong";
    }
    else if (props.selectedStudent === "All" && props.rightAnswerPercentage >= 0.5) {
        className = "right";
    }
    else if (props.selectedStudent === "All" && props.rightAnswerPercentage < 0.5) {
        className = "wrong";
    }
    else {
        className = "";
    }

    return (
        <div style={{marginTop: '15px', marginBottom: '10px'}}>
            <Paper elevation={4}>
                <div style={{padding: '30px'}} className={className}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant={'subheading'}>{props.question}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={4}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedChoice}>
                                        <FormControlLabel value={props.answerKey + ' ' + 0}
                                                          control={<Radio disabled/>}
                                                          label={props.answers[0]}/>
                                    </RadioGroup>
                                </Grid>

                                <Grid item xs={1}>
                                    {props.rightSolution === 0 ?
                                        <i className="material-icons">check_circle_outline</i> :
                                        <i className="material-icons">highlight_off</i>}
                                </Grid>
                                <Grid id="percentage" item xs={1}>
                                    {(props.percentage[0] * 100).toFixed(0) + '%'}
                                </Grid>
                                <Grid item xs={4}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedChoice}>
                                        <FormControlLabel value={props.answerKey + ' ' + 1}
                                                          control={<Radio disabled/>}
                                                          label={props.answers[1]}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={1}>
                                    {props.rightSolution === 1 ?
                                        <i className="material-icons">check_circle_outline</i> :
                                        <i className="material-icons">highlight_off</i>}
                                </Grid>
                                <Grid id="percentage" item xs={1}>
                                    {(props.percentage[1] * 100).toFixed(0) + '%'}
                                </Grid>

                                <Grid item xs={4}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedChoice}>
                                        <FormControlLabel value={props.answerKey + ' ' + 2}
                                                          control={<Radio disabled/>}
                                                          label={props.answers[2]}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={1}>
                                    {props.rightSolution === 2 ?
                                        <i className="material-icons">check_circle_outline</i> :
                                        <i className="material-icons">highlight_off</i>}
                                </Grid>
                                <Grid id="percentage" item xs={1}>
                                    {(props.percentage[2] * 100).toFixed(0) + '%'}
                                </Grid>

                                <Grid item xs={4}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedChoice}>
                                        <FormControlLabel value={props.answerKey + ' ' + 3}
                                                          control={<Radio disabled/>}
                                                          label={props.answers[3]}/>
                                    </RadioGroup>
                                </Grid>

                                <Grid item  xs={1}>
                                    {props.rightSolution === 3 ?
                                        <i className="material-icons">check_circle_outline</i> :
                                        <i className="material-icons">highlight_off</i>}
                                </Grid>

                                <Grid id="percentage" item xs={1}>
                                    {(props.percentage[3] * 100).toFixed(0) + '%'}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>


    );


};

export default Exercise;