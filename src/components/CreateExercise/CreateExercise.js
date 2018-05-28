import React,{Component} from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

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
                        helperText="Required"
                        required={true}
                        multiline
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogContent>
                    <RadioGroup
                        value={this.props.value}
                        onChange={this.props.changeRadio(this.state.id)}
                        row={true}>
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                multiline
                                onChange={this.props.changeAnswers(this.state.id, 1)}
                                label="Answer 1"
                                helperText="Required"
                                required={true}
                            />}
                            value={"1"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                label="Answer 2"
                                onChange={this.props.changeAnswers(this.state.id, 2)}
                                multiline
                                helperText="Required"
                                required={true}
                            />}
                            value={"2"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                onChange={this.props.changeAnswers(this.state.id, 3)}
                                multiline
                                label="Answer 3"
                                helperText="Required"
                                required={true}
                            />}
                            value={"3"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                onChange={this.props.changeAnswers(this.state.id, 4)}
                                multiline
                                label="Answer 4"
                                helperText="Required"
                                required={true}
                            />}
                            value={"4"}
                        />
                    </RadioGroup>
                </DialogContent>
            </div>
        )
    }
}

export default CreateExercise;