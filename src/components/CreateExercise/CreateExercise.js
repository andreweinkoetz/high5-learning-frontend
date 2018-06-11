import React,{Component} from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class CreateExercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id
        }
    };

    render () {
        return (
            <div>
                <DialogContent>
                    <TextField
                        label={"Exercise " + this.props.id}
                        onChange={this.props.changeQuestion(this.state.id)}
                        error={this.props.errorExerciseQuestion}
                        helperText="Required"
                        required={true}
                        multiline
                        fullWidth={true}
                        value={this.props.questionValue}
                    />
                </DialogContent>
                <DialogContent>
                    <RadioGroup
                        value={String(this.props.radioValue)}
                        onChange={this.props.changeRadioValue(this.state.id)}
                        row={true}>
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                multiline
                                onChange={this.props.changeAnswers(this.state.id, 0)}
                                error={this.props.errorExerciseAnswers[0]}
                                label="Answer 1"
                                helperText="Required"
                                required={true}
                                value={this.props.answersValues[0]}
                            />}
                            value={"0"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                label="Answer 2"
                                onChange={this.props.changeAnswers(this.state.id, 1)}
                                error={this.props.errorExerciseAnswers[1]}
                                multiline
                                helperText="Required"
                                required={true}
                                value={this.props.answersValues[1]}
                            />}
                            value={"1"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                onChange={this.props.changeAnswers(this.state.id, 2)}
                                error={this.props.errorExerciseAnswers[2]}
                                multiline
                                label="Answer 3"
                                helperText="Required"
                                required={true}
                                value={this.props.answersValues[2]}
                            />}
                            value={"2"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                onChange={this.props.changeAnswers(this.state.id, 3)}
                                error={this.props.errorExerciseAnswers[3]}
                                multiline
                                label="Answer 4"
                                helperText="Required"
                                required={true}
                                value={this.props.answersValues[3]}
                            />}
                            value={"3"}
                        />
                    </RadioGroup>
                    {this.props.ableToDeleteExercises ? <Grid container justify={"center"}>
                        <DialogActions>
                            <Button
                                color={"secondary"}
                                variant={"raised"}
                                onClick={() => this.props.handleDeleteExercise(this.state.id)}
                            >Delete exercise {this.state.id}</Button>
                        </DialogActions>
                    </Grid> : null}
                </DialogContent>
            </div>
        )
    }
}

export default CreateExercise;