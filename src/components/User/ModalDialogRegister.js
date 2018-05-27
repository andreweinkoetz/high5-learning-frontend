import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialog.css';

class ModalDialogRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: "Student",
        };
    }

    handleChange = (event) => {
        this.setState({
            type: event.target.value,
        });
    };

    save() {

    }

    render() {
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    className={"modalDialog"}
                    open={this.props.visible}
                >
                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Username"
                            helperText="Required"
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="Password"
                            helperText="Required"
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="Password"
                            helperText="Required"
                        />
                    </DialogContent>
                    <DialogContent>
                        <RadioGroup
                            aria-label="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="Teacher" control={<Radio/>} label="Teacher"/>
                            <FormControlLabel value="Student" control={<Radio/>} label="Student"/>
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={"saveButton"}
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.save}
                        >Register</Button>
                        <Button
                            className={"Button"}
                            color={"secondary"}
                            variant={"raised"}
                            onClick={this.props.cancel}
                        >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogRegister;