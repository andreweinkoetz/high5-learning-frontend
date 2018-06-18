import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';


import './ModalDialog.css';
import UserService from "../../services/UserService";

class ModalDialogRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            username: "",
            type: "Student",
            school: "",
            license: ""
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeLicense = this.handleChangeLicense.bind(this);
        this.handleChangeSchool = this.handleChangeSchool.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangeSchool(event) {
        this.setState({school: event.target.value});
    }

    handleChangeLicense(event) {
        this.setState({license: event.target.value});
    }

    handleChangeType = (event) => {
        this.setState({
            type: event.target.value,
        });
    };

    handleSubmit() {
        const username = this.state.username;
        const password = this.state.password;
        const school = this.state.school;
        if (username === "" || password === "") {
            this.props.handleNotification({
                code: 400,
                title: 'Failed to register',
                msg: 'Both Username and Password are required fields.',
                variant: 'warning'
            });
            return;
        }
        if (school === "") {
            this.props.handleNotification({
                code: 400,
                title: 'Failed to register',
                msg: 'It is required to select a school.',
                variant: 'warning'
            });
            return;
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(username)) {
            this.props.handleNotification({
                code: 400,
                title: 'Failed to register',
                msg: 'Username has to be a vaid email address.',
                variant: 'warning'
            });
            return;
        }

        const type = this.state.type;
        let license = undefined;
        if (type === "Teacher") license = this.state.license;
        if (type === "Teacher" && license === "") {
            this.props.handleNotification({
                code: 400,
                title: 'Failed to register',
                msg: 'Please type in a valid license code.',
                variant: 'warning'
            });
            return;
        }
        UserService.register(username, password, type, school, license).then((data) => {
            if (UserService.isAuthenticated()) {
                this.props.onUsername(username);
            } else {
                this.props.handleNotification({
                    code: 400,
                    title: 'Registration failed',
                    msg: 'Registration failed, please check your username and password.',
                    variant: 'error'
                })
            }
        }).catch((e) => {
            this.props.handleNotification(e);
        });
    }

    render() {

        const licenseDialog = (this.state.type === "Teacher") ? (
            <DialogContent> <TextField
                label="License"
                helperText="Required"
                onChange={this.handleChangeLicense}
            />
            </DialogContent>) : undefined;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                className={"modalDialog"}
                open={true}
            >
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        helperText="Required"
                        type="email"
                        autoFocus={true}
                        required={true}
                        onChange={this.handleChangeUsername}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        label="Password"
                        type="password"
                        helperText="Required"
                        required={true}
                        onChange={this.handleChangePassword}
                    />
                </DialogContent>
                <DialogContent>
                    {/** show InputLabel only when state of school is empty*/}
                    {(this.state.school === "") && <InputLabel htmlFor="school-helper">School&nbsp;&nbsp;</InputLabel>}
                    <Select
                        value={this.state.school}
                        onChange={this.handleChangeSchool}
                        input={<Input name="school" id="school-helper"/>}>
                        {this.props.schools.map((school) => {

                            return (
                                <MenuItem key={school._id} value={school.name}>{school.name}</MenuItem>
                            )

                        })}
                    </Select>
                    <FormHelperText>Select your School</FormHelperText>
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
                {licenseDialog}
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
        )
    }
}

export default ModalDialogRegister;