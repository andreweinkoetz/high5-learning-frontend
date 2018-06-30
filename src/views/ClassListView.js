import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

import ClassList from '../components/Class/ClassList';
import ClassService from '../services/ClassService';
import UserService from '../services/UserService';
import ModalDialogClass from '../components/ModalDialogClass/ModalDialogClass';

// Default view after logging in
// A list of classes is displayed in which the user is enrolled.
export default class ClassListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,

            // set true when teacher clicks "add new class" or "update class" button, then modal dialog is shown
            showModal: false,

            // array of classes of user
            classes: [],

            // only relevant for a teacher, if he/she wants to update a class, this is set to true
            updateClassWished: false,

            // also only relevant for a teacher, if he/she wants to update a class, id of to be updated class is set
            // (needed so that in backend you know which class should be updated)
            idOfToBeUpdatedClass: '',

            // also only relevant for a teacher, if he/she wants to update a class, info of class to be updated is set
            // (and given to modal dialog)
            informationOfClassToBeUpdated: {
                title: '',
                description: '',
                students: []
            },

            // only relevant for student, open homework (meaning student didn't do these homework yet) are stored here
            openHomework: {}
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ClassService.getClassesOfUser() // all classes of a user to be displayed in the panels
            .then((data) => {
                if (data.length === 0) {
                    this.setState({
                        loading: false
                    })
                } else {
                    this.setState({
                        classes: [...data]
                    });
                }
            })
            .then(() => {
                return ClassService.getOpenHomeworkOfStudent(); // number to be displayed in badge
            })
            .then(openHw => {
                if (openHw) { // if there are open homework, save them
                    this.setState({
                        openHomework: {...openHw},
                        loading: false
                    })
                }
            })
            .catch(
                (e) => this.props.handleNotification(e));
    };

    // needed so that breadcrumbs update after component has mounted
    componentDidMount() {
        this.props.updateBreadcrumb([
            {
                link: '/myclasses',
                linkName: 'My classes'
            }
        ])
    };

    // toggles modal, either shows it or let it disappear, depending on context
    toggleModal = () => {
        const oldState = this.state.showModal;
        this.setState({
            showModal: !oldState
        });
    };

    // invoked from modal dialog, if teacher submitted his/her changes by adding or updating a class
    handleChangesOfClasses = () => {

        // get the updated classes of the teacher...
        ClassService.getClassesOfUser()
            .then((classes) => {
                // needed so that updated classes is shown in correctly in navbar
                this.props.updateNavBar(classes);

                // ... and set them
                this.setState({
                    classes: [...classes]
                });

                this.toggleModal();
            }).catch((e) => this.props.handleNotification(e));
    };

    // invoked from the single class components when teacher wants to update a specific class
    handleUpdateClassWished = (id, title, description) => {
        // students of the to be updated class are fetched...
        ClassService.getStudentsOfClass(id)
            .then(students => {
                // ... information of to be updated class is saved ...
                const informationOfClassToBeUpdated = {title: title, description: description, students: students};
                // ... the modal dialog is shown, as a update class (not create class) and needed info is set
                // (which is given to ModalDialogClass component)
                this.setState({
                    showModal: true, // not toggled, because otherwise modal dialog doesn't have info of to be updated class
                    updateClassWished: true,
                    idOfToBeUpdatedClass: id,
                    informationOfClassToBeUpdated: informationOfClassToBeUpdated
                });
            }).catch((e) => this.props.handleNotification(e));
    };

    // invoked from the single class components when teacher wants to delete a class
    handleDeleteClass = (id) => {

        // class is deleted ...
        ClassService.deleteClass(id)
            .then((updatedClasses) => {

                // this is needed so that the navbar is updated (meaning deleted class isn't shown anymore)
                this.props.updateNavBar(updatedClasses);

                const uClasses = [...updatedClasses];

                // ...and updated classes (meaning without deleted class) is set to current classes
                this.setState({classes: uClasses});

            }).catch(e => this.props.handleNotification(e));
    };

    // invoked, when modal is closed. Sets updateClassWished to false, so that no visual bug occurs
    // (only after the dialog is closed, this is set to false, so that the text in the dialog doesn't change from
    // "update class" to "create new class" while closing)
    handleOnExitModal = () => {
        this.setState({updateClassWished: false})
    };

    render() {

        // will only be displayed when logged in user is of type 'teacher'
        let addClassButton = null;

        if (UserService.isTeacher()) {
            addClassButton = <Grid item xs={6} sm={6} md={6}>
                <Grid container spacing={0} align={'right'}>
                    <Grid item xs={12}>
                        <Hidden only={'xs'}>
                            <Button variant="raised" color="primary" onClick={this.toggleModal}>
                                <AddIcon/>
                                Add new class</Button>
                        </Hidden>
                        <Hidden smUp>
                            <Button variant="fab" color="primary" aria-label="add"
                                    onClick={this.toggleModal}>
                                <AddIcon/>
                            </Button>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>;
        }

        return (
            <div>
                <ModalDialogClass
                    toggle={this.toggleModal}
                    handleChangesOfClasses={this.handleChangesOfClasses}
                    handleNotification={this.props.handleNotification}
                    onExitModal={this.handleOnExitModal}

                    visible={this.state.showModal}
                    updateWished={this.state.updateClassWished}
                    informationOfClassToBeUpdated={this.state.informationOfClassToBeUpdated}
                    idOfToBeUpdatedClass={this.state.idOfToBeUpdatedClass}/>
                <Grid container spacing={16}>
                    <Grid item xs={addClassButton ? 6 : 12} sm={addClassButton ? 6 : 12} md={addClassButton ? 6 : 12}
                          style={{minHeight: 56}}>
                        <Typography variant={'title'}>My classes</Typography>
                        <Typography variant={'caption'}>Below you find all your classes</Typography>
                    </Grid>
                    {addClassButton}
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loading ?
                            <div style={{textAlign: 'center', paddingTop: 40}}><CircularProgress size={30}/>
                                <Typography variant={'caption'}>Loading...</Typography></div>
                            : <ClassList // here the list comp is called to display all classes of a user in panels
                                classes={this.state.classes}
                                openHomework={this.state.openHomework}
                                updateClassInfo={this.handleUpdateClassWished}
                                deleteClass={this.handleDeleteClass}/>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}