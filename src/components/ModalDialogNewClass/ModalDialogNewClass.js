import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialogNewClass.css';

class ModalDialogNewClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            title: "",
            description: "",
            error: false
        };
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleSubmit = () => {
        if (this.state.title === "") {
            this.setState({error:true});
        }
        else {
            this.setState({error:false});
            this.setState({visible: false});
        }
    };

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    render () {

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.visible}
                >
                    <DialogTitle>Create new class</DialogTitle>
                    <DialogContent>
                    <TextField
                        error={this.state.error}
                        onChange={this.handleTitleChange}
                        label="Title"
                        helperText="Required"
                        multiline
                        required={true}
                    />
                    </DialogContent>
                    <DialogContent>
                    <TextField
                        onChange={this.handleDescriptionChange}
                        label="Description"
                        multiline
                    />
                    </DialogContent>
                <DialogActions>
                    <Button
                        color={"primary"}
                        variant={"raised"}
                        onClick={this.handleSubmit}
                    >Create Class</Button>
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={this.handleCancel}
                    >Cancel</Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ModalDialogNewClass;