import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialog.css';
import UserService from "../../services/UserService";

class ModalDialogRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            username: "",
            type: "Student",
            license: ""
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePassword(event) {
        this.setState({password:event.target.value});
    }

    handleChangeUsername(event) {
        this.setState({username:event.target.value});
    }

    handleChangeType = (event) => {
        this.setState({
            type: event.target.value,
        });
    };

    handleSubmit(){
        const username = this.state.username;
        const password = this.state.password;
        const type = this.state.type;
        console.log(username);
        let license = undefined;
        if(type === "Teacher") license = this.state.license;
        UserService.register(username, password, type, license).then((data) => {
            if(UserService.isAuthenticated()){
                this.props.onUsername(username);
            }else{
                alert("Registration failed!");
            }
        }).catch((e) => {
            console.error(e);
            alert("Registration failed: "+e);
        });
        this.props.cancel();
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
                            onChange={this.handleChangeUsername}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            label="Password"
                            type="password"
                            helperText="Required"
                            onChange={this.handleChangePassword}
                        />
                    </DialogContent>
                    <DialogContent>
                        <RadioGroup
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChangeType}
                        >
                            <FormControlLabel value="Teacher" control={<Radio/>} label="Teacher"/>
                            <FormControlLabel value="Student" control={<Radio/>} label="Student"/>
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={"Button"}
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.handleSubmit}
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