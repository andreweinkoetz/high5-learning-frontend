import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialogNewClass.css';

class ModalDialogNewClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };
    }
    disappear = () => {
        this.setState({visible: false});
    };

    render () {
        return (
            <div className={"modalDialogNewClass"}>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    className={"modalDialogNewClass"}
                    open={this.state.visible}
                >
                    <DialogTitle>Create new class</DialogTitle>
                    <DialogContent>
                    <TextField
                        label="Title"
                        helperText="Required"
                    />
                    </DialogContent>
                    <DialogContent>
                    <TextField
                        label="Description"
                        multiline
                    />
                    </DialogContent>
                <DialogActions>
                    <Button
                        className={"modalDialogNewClassButtonCreate"}
                        color={"primary"}
                        variant={"raised"}
                        onClick={this.disappear}
                    >Create Class</Button>
                    <Button
                        className={"modalDialogNewClassButtonCancel"}
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

export default ModalDialogNewClass;