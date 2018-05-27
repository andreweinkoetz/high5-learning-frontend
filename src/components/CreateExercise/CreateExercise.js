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
            value: ""
        }
    };

    change = (event) => {
        this.setState({value: event.target.value})
    };

    render () {
        return (
            <div>
                <DialogContent>
                    <TextField
                        label={"Exercise " + this.props.id}
                        helperText="Required"
                        required={"true"}
                        multiline
                        fullWidth={"true"}
                    />
                </DialogContent>
                <DialogContent>
                    <RadioGroup
                        value={this.state.value}
                        onChange={this.change}
                        row={true}>
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                multiline
                                label="Answer 1"
                                helperText="Required"
                                required={"true"}
                            />}
                            value={"a1"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                label="Answer 2"
                                helperText="Required"
                                required={"true"}
                            />}
                            value={"a2"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                label="Answer 3"
                                helperText="Required"
                                required={"true"}
                            />}
                            value={"a3"}
                        />
                        <FormControlLabel
                            control={<Radio/>}
                            label={<TextField
                                label="Answer 4"
                                helperText="Required"
                                required={"true"}
                            />}
                            value={"a4"}
                        />
                    </RadioGroup>
                </DialogContent>
            </div>
        )
    }
}

export default CreateExercise;