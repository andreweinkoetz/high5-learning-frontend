import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import SuccessFailureComponent from '../SuccessComponent/SuccessFailureComponent';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';

class ModalDialogRegisteringNewStudentToClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            showSuccessFailure: false,
            success: false,
            classPassword: "",
            userPassword: "",
            wrongPassword: false
        }
    };

    componentWillMount() {
        UserService.isMemberOfClass(this.props.match.params.classId).then((data) => {
            if (UserService.isMemberOfClassChecker(data)) {
                window.location = '/myclasses/';
            }
            else {
                ClassService.getClassDetail(this.props.match.params.classId).then((c) => {
                    this.setState({classPassword: c.password});
                })
            }
            }).catch((e) => {
                console.error(e);
        });
    };

    handleSubmitModal() {

        const classToAdd = {...this.state.classToAdd};

        if (classToAdd.title === '') {
            this.setState({modalError: true, errorNoTitle: true});
        } else {
            this.addNewClass(classToAdd);
        }
    };

    handlePasswordChange = (event) => {
        const updatedPassword = event.target.value;
        if (updatedPassword !== "") {
            this.setState({wrongPassword: false});
        }
        this.setState({userPassword: updatedPassword});
    };

    handleCancelClick = () => {
        this.setState({visible: false});
    };

    handleSubmitClick = () => {
        let checkPasswords = (this.state.classPassword === this.state.userPassword);
        if (checkPasswords) {
            UserService.createMembership(this.props.match.params.classId).then(() => {
                UserService.isMemberOfClass(this.props.match.params.classId).then((data) => {
                    if (UserService.isMemberOfClassChecker(data)) {
                        this.setState({showSuccessFailure: true, success: true});
                    }
                    else {
                        this.setState({showSuccessFailure: true});
                    }
                })
            })
        }
        else {
            this.setState({wrongPassword: true});
        }
    };

    handleMessageRead = () => {
        this.setState({showSuccess: false, visible: false});
        window.location = '/myclasses/';
    }

    render () {
        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.visible}
                >
                    <DialogTitle>Enter password for class</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={this.state.wrongPassword}
                            onChange={this.handlePasswordChange}
                            label="Password"
                            helperText="Required"
                            value={this.state.userPassword}
                            multiline
                            required={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.handleSubmitClick}
                        >Submit</Button>
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={this.handleCancelClick}
                        >Cancel</Button>
                    </DialogActions>
                    <SuccessFailureComponent
                        visible={this.state.showSuccessFailure}
                        messageRead={this.handleMessageRead}
                        success={this.state.success}/>
                </Dialog>
            </div>
        )
    }
};

export default ModalDialogRegisteringNewStudentToClass;