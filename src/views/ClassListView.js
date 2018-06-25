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
import ModalDialogNewClass from '../components/ModalDialogNewClass/ModalDialogNewClass';

// Default view after logging in
// A list of classes is displayed in which the user is enrolled.
export default class ClassListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showModal: false, // set true when teacher clicks "add new class" or "update class" button, then modal dialog is shown
            classes: [], // array of classes of user
            updateClassWished: false, // only relevant for a teacher, if he/she wants to update a class, this is set to true
            idOfToBeUpdatedClass: '', // also only relevant for a teacher, if he/she wants to update a class, id of to be updated class is set (needed so that in backend you know which class should be updated)
            informationOfClassToBeUpdated: { // also only relevant for a teacher, if he/she wants to update a class, info of class to be updated is set (and given to modal dialog)
                title: '',
                description: '',
                students: []
            },
            openHomework: {} // only relevant for student, open homework (meaning student didn't do these homework yet) are stored here
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

    componentDidMount() { // needed so that breadcrumbs update after component has mounted
        this.props.updateBreadcrumb([
            {
                link: '/myclasses',
                linkName: 'My classes'
            }
        ])
    };

    toggleModal = () => { // toggles modal, either shows it or let it disappear, depending on context
        const oldState = this.state.showModal;
        this.setState({
            showModal: !oldState,
            updateClassWished: false // set to false, because when teacher first updates a class and then wants to add a new one, modal dialog for creating a new class should be shown (not updating a class)
        });
    };

    handleChangesOfClasses = () => { // invoked from modal dialog, if teacher submitted his/her changes by adding or updating a class
        const oldState = this.state.showModal;

        ClassService.getClassesOfUser()
            .then((data) => { // get the updated classes of the teacher...
                this.props.updateNavBar(data); // needed so that updated classes is shown in correctly in navbar
                this.setState({
                    classes: [...data], // ... and set them
                    showModal: !oldState
                });
            }).catch((e) => this.props.handleNotification(e));
    };

    handleUpdateClassWished = (id, t, d) => { // invoked from the single class components when teacher wants to update a specific class
        ClassService.getStudentsOfClass(id)
            .then(students => { // students of the to be updated class are fetched...
                const informationOfClassToBeUpdated = {title: t, description: d, students: students}; // ... information of to be updated class is saved ...
                this.setState({ // ... the modal dialog is shown, as a update class (not create class) and needed info is set (which is given to ModalDialogNewClass component)
                    showModal: true,
                    updateClassWished: true,
                    idOfToBeUpdatedClass: id,
                    informationOfClassToBeUpdated: informationOfClassToBeUpdated
                });
            }).catch((e) => this.props.handleNotification(e));
    };

    handleDeleteClass = (id) => { // invoked from the single class components when teacher wants to delete a class
        ClassService.deleteClass(id) // class is deleted ...
            .then((updatedClasses) => {
                this.props.updateNavBar(updatedClasses); // this is needed so that the navbar is updated (meaning deleted class isn't shown anymore)
                const nClasses = [...updatedClasses];
                this.setState({classes: nClasses}); // ...and updated classes (meaning without deleted class) is set to current classes
            }).catch(e => this.props.handleNotification(e));
    };

    render() {

        let addClassButton = null; // will only be displayed when logged in user is of type 'teacher'

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
                <ModalDialogNewClass
                    visible={this.state.showModal}
                    toggle={this.toggleModal}
                    updateWished={this.state.updateClassWished}
                    handleNotification={this.props.handleNotification}
                    informationOfClassToBeUpdated={this.state.informationOfClassToBeUpdated}
                    idOfToBeUpdatedClass={this.state.idOfToBeUpdatedClass}
                    handleChangesOfClasses={this.handleChangesOfClasses}/>
                <Grid container spacing={16}>
                    <Grid item xs={addClassButton ? 6 : 12} sm={addClassButton ? 6 : 12} md={addClassButton ? 6 : 12} style={{minHeight:56}}>
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