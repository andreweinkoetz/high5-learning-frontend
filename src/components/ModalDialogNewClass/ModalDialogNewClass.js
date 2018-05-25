import React, {Component} from 'react';
import {Button, DialogContainer, TextField} from 'react-md';

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
            <div >
                <DialogContainer
                    className={"modalDialogNewClass"}
                    title="Create new class"
                    visible={this.state.visible}
                >
                    <TextField
                        label="Title"
                        helpText="Required"
                    />
                    <TextField
                        label="Description"
                        rows={5}
                    />
                    <Button
                        className={"modalDialogNewClassButtonCreate"}
                        label="Create class"
                        onClick={this.disappear}
                    />
                    <Button
                        className={"modalDialogNewClassButtonCancel"}
                        label="Cancel"
                        onClick={this.disappear}
                    />
                </DialogContainer>
            </div>
        )
    }

}