import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialog.css';
import UserService from '../../services/UserService'

class ModalDialogLogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            username: "",
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePassword(event) {
        this.setState({password:event.target.value});
    }

    handleChangeUsername(event) {
        this.setState({username:event.target.value});
    }

    handleSubmit(){
        const username = this.state.username;
        const password = this.state.password;
        if(username === "" || password === ""){
            this.props.handleException({code:400,title:'Login failed',msg:'Both Username and Password are required fields.'})
            return;
        }
        UserService.login(username, password).then((data) => {
            if(UserService.isAuthenticated()){
                this.props.onUsername(username);
            }else{
                this.props.handleException({code:400,title:'Login failed',msg:'User could not be logged in, please check your username and password.'})
            }
        }).catch((e) => {
            this.props.handleException(e);
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
                    open={true}
                >
                    <DialogTitle>LogIn</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Username"
                            helperText="Required"
                            type="email"
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
                    <DialogActions>
                        <Button
                            className="Button"
                            color="primary"
                            variant="raised"
                            onClick={this.handleSubmit}
                        >LogIn</Button>
                        <Button
                            className="Button"
                            color="secondary"
                            variant="raised"
                            onClick={this.props.cancel}
                        >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogLogIn;