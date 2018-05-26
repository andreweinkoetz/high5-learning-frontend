import React, {Component} from 'react';
import {Button, DialogContainer, TextField} from 'react-md';

import './ModalDialogNewHomework.css';

class ModalDialogNewHomework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };
    }

    disappear = () => {
        this.setState({visible: false})
    };


    render () {
        return (
            <div>
                <DialogContainer
                className={"modalDialogNewHomework"}
                title="Create new Homework"
                visible={this.state.visible}
                >
                    <TextField
                        label="Title"
                        helpText="Required"
                    />
                    <TextField
                        label="Exercise 1"
                        helpText="Required"
                        rows={5}
                    />
                    <TextField
                        label="Answer 1"
                        helpText="Required"
                    />
                    <TextField
                        label="Answer 2"
                        helpText="Required"
                    />
                    <TextField
                        label="Answer 3"
                        helpText="Required"
                    />
                    <TextField
                        label="Answer 4"
                        helpText="Required"
                    />
                    <Button
                        className={"modalDialogNewHomeworkButtonCreate"}
                        label="Create class"
                        onClick={this.disappear}
                    />
                    <Button
                        className={"modalDialogNewHomeworkButtonCancel"}
                        label="Cancel"
                        onClick={this.disappear}
                    />
                </DialogContainer>
            </div>
        )
    }
}

export default ModalDialogNewHomework;