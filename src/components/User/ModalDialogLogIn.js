import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialog.css';

class ModalDialogLogIn extends Component {

    save(){

    }

    render () {
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    className={"modalDialog"}
                    open={this.props.visible}
                >
                    <DialogTitle>LogIn</DialogTitle>
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
                    <DialogActions>
                        <Button
                            className={"saveButton"}
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.save}
                        >LogIn</Button>
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

export default ModalDialogLogIn;