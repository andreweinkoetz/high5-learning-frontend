import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import './ModalDialogNewHomework.css';

class ModalDialogNewHomework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            value: ""
        };
    }

    disappear = () => {
        this.setState({visible: false})
    };

    change = (event) => {
      this.setState({value: event.target.value})
    };


    render () {

        const classes = {
            root: {
                padding: '10px',
                margin: '10px',
            },
        };

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    className={"modalDialogNewClass"}
                    open={this.state.visible}
                >
                    <DialogTitle>Create new homwork</DialogTitle>
                    <DialogContent>
                    <TextField
                        label="Title"
                        helperText="Required"
                        required={"true"}
                        fullWidth={"true"}
                        autoFocus={"true"}
                    />
                    </DialogContent>
                    <DialogContent>
                    <TextField
                        label="Exercise 1"
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
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.disappear}
                        >Add new exercise to homework</Button>
                    </DialogActions>
                <DialogActions>
                    <Button
                        color={"primary"}
                        variant={"raised"}
                        onClick={this.disappear}
                    >Create homework</Button>
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={this.disappear}
                    >Cancel</Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogNewHomework;