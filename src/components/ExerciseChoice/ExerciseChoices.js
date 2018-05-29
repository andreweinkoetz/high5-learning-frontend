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
        return (
            <div>
                <ExpansionPanel>
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
                </ExpansionPanel>

            </div>);
    }
}

