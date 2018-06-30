import React from 'react';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Grid from '@material-ui/core/Grid';

const Exercise = (props) => {

    return (
        <div style={{margin: '10px'}}>
            <Paper elevation={4}>
                <div style={{padding: '30px'}}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant={'subheading'}>{props.question}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedValue}
                                                onChange={props.handleSelection}>
                                        <FormControlLabel value={props.answerKey + ' ' + 0} control={<Radio/>}
                                                          label={props.answers[0]}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedValue}
                                                onChange={props.handleSelection}>
                                        <FormControlLabel value={props.answerKey + ' ' + 1} control={<Radio/>}
                                                          label={props.answers[1]}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedValue}
                                                onChange={props.handleSelection}>
                                        <FormControlLabel value={props.answerKey + ' ' + 2} control={<Radio/>}
                                                          label={props.answers[2]}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <RadioGroup name={'exercise-choices'} row
                                                value={props.answerKey + ' ' + props.selectedValue}
                                                onChange={props.handleSelection}>
                                        <FormControlLabel value={props.answerKey + ' ' + 3} control={<Radio/>}
                                                          label={props.answers[3]}/>
                                    </RadioGroup>
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