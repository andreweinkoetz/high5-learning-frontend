import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import './ModalDialogNewClass.css';

const ModalDialogNewClass = (props) => {


    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={props.visible}
            >
                <DialogTitle>Create new class</DialogTitle>
                <DialogContent>
                    <TextField
                        error={props.error}
                        onChange={props.handleTitleChange}
                        label="Title"
                        helperText="Required"
                        value={props.title}
                        multiline
                        required={true}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        onChange={props.handleDescriptionChange}
                        label="Description"
                        value={props.description}
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color={"primary"}
                        variant={"raised"}
                        onClick={props.handleSubmit}
                    >Create Class</Button>
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={props.toggle}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ModalDialogNewClass;