import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './ExerciseChoices.css';

export class ExerciseChoices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            question: props.question,
            answers: props.answers
        };

    }

    render() {
        return (<div>
            {/*<ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={"questionExercise"}>{this.state.question}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <FormControl>
                        <FormLabel>Choose the correct answer:</FormLabel>

                        <RadioGroup
                            //onChange={this.props.changeRadio(this.state.id)}
                            row="true"
                        >
                            <FormControlLabel value={this.state.answers[0]} control={<Radio/>}
                                              label={this.state.answers[0]}/>
                            <i className="material-icons">
                                check_circle
                            </i>

                            <FormControlLabel value={this.state.answers[1]} control={<Radio/>}
                                              label={this.state.answers[1]}/>
                        </RadioGroup>
                        <RadioGroup
                            //onChange={this.props.changeRadio(this.state.id)}
                            row="true"
                        >
                            <FormControlLabel value={this.state.answers[2]} control={<Radio/>}
                                              label={this.state.answers[2]}/>

                            <FormControlLabel value={this.state.answers[3]} control={<Radio/>}
                                              label={this.state.answers[3]}/>

                        </RadioGroup>
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>*/}

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={"questionExercise"}>{this.state.question}</Typography>
                </ExpansionPanelSummary>

                <Grid container spacing={0}>
                    <Grid item xs={8} sm={4}>
                        <FormControlLabel value={this.state.answers[0]} control={<Radio/>}
                                          label={this.state.answers[0]}/>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <i className="material-icons">
                            check_circle
                        </i>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <p>50%</p>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <FormControlLabel value={this.state.answers[1]} control={<Radio/>}
                                          label={this.state.answers[1]}/>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <i className="material-icons">
                            cancel
                        </i>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <p>40%</p>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <FormControlLabel value={this.state.answers[2]} control={<Radio/>}
                                          label={this.state.answers[2]}/>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <i className="material-icons">
                            cancel
                        </i>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                       <p>5%</p>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <FormControlLabel value={this.state.answers[3]} control={<Radio/>}
                                          label={this.state.answers[3]}/>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <i className="material-icons">
                            cancel
                        </i>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <p>5%</p>
                    </Grid>
                </Grid>
            </ExpansionPanel>


        </div>);
    }
}

