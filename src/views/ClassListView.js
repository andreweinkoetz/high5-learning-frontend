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
import SchoolService from "../services/SchoolService";

export default class ClassListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showModal: false,
            classToAdd: {
                title: '',
                description: ''
            },
            classes: [],
            updateClassWished: false,
            idOfToBeUpdatedClass: '',
            studentsOfSchool: [],
            studentsOfClassToBeUpdated: []
        };

        this.addNewClass = this.addNewClass.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ClassService.getClassesOfUser().then((data) => {
            this.setState({
                classes: [...data],
                loading: false
            });
        }).catch((e) => {
            this.props.handleNotification(e);
        });

        SchoolService.getStudentsOfSchool("no").then(data =>{
            this.setState({studentsOfSchool: data});
        })

    };

    componentDidMount() {
        this.props.updateBreadcrumb([
            {
                link: '/myclasses',
                linkName: 'My classes'
            }
        ])
    }


    toggleModal() {
        const oldState = this.state.showModal;
        const errorStateWhenClickingAdd = false; // needed so that the old state of a canceled class creation isn't shown in the modal dialog
        const classToAddWhenClickingAdd = {title: '', description: ''};
        this.setState({
            showModal: !oldState,
            errorState: errorStateWhenClickingAdd,
            classToAdd: classToAddWhenClickingAdd,
            updateClassWished: false
        });
    };

    updateClass(classToUpdate) {

        ClassService.updateClass(classToUpdate, this.state.idOfToBeUpdatedClass).then((updatedClass) => {

            console.log(updatedClass);

            let newClasses = [...this.state.classes];

            let classToUpdate = newClasses.find(e => e._id === updatedClass._id);

            classToUpdate.title = updatedClass.title;
            classToUpdate.description = updatedClass.description;

            this.setState({classes: newClasses, updateClassWished: false});
            this.toggleModal();

        }).catch(e => this.props.handleNotification(e));

    };

    handleSubmitModal(classToAdd) {

        if (this.state.updateClassWished) {
            this.updateClass(classToAdd);
        }
        else {
            if (classToAdd.title === '') {
                this.props.handleNotification({
                    title: 'No title',
                    msg: 'Your class must have a title.',
                    code: 12,
                    variant: 'warning'
                });
            } else {
                this.addNewClass(classToAdd);
            }
        }
    };


    addNewClass(classToAdd) {

        ClassService.addNewClass(classToAdd).then((newClass) => {
                const newClasses = [...this.state.classes, newClass];

                this.setState({classes: newClasses});
                this.toggleModal();

            }
        ).catch(e => this.props.handleNotification(e));
    };

    handleUpdateClassInfoWished = (id, t, d) => {
        const updatedClass = {title: t, description: d};
        ClassService.getStudentsOfClass(id).then(students => {
            console.log(students);
            const studentsOfClass = students;
            this.setState({
                classToAdd: updatedClass,
                showModal: true,
                updateClassWished: true,
                idOfToBeUpdatedClass: id,
                studentsOfClassToBeUpdated: students
            });
        })
    };

    handleDeleteClass = (id) => {

        ClassService.deleteClass(id).then((newClasses) => {
            const nClasses = [...newClasses];
            this.setState({classes: nClasses});
            console.log(this.state.classes);
        }).catch(e => this.props.handleNotification(e));

    };


    render() {

        let addClassButton;

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
        } else {
            addClassButton = <Grid item xs={6} sm={6} md={6}>
                <Grid container spacing={0} align={'right'}>
                </Grid>
            </Grid>;
        }

        let modalDialog = this.state.showModal
            ? <ModalDialogNewClass
                visible={this.state.showModal}
                handleTitleChange={this.handleTitleChange}
                handleDescriptionChange={this.handleDescriptionChange}
                handleSubmit={this.handleSubmitModal}
                toggle={this.toggleModal}
                values={this.state.classToAdd}
                studentsOfSchool={this.state.studentsOfSchool}
                updateWished={this.state.updateClassWished}
                handleNotification={this.props.handleNotification}
                studentsOfClassToBeUpdated={this.state.studentsOfClassToBeUpdated}/>
            : null

        return (
            <div>
                {modalDialog}
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My classes</Typography>
                    </Grid>
                    {addClassButton}
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loading ?
                            <div style={{textAlign: 'center', paddingTop: 40}}><CircularProgress size={30}/>
                                <Typography variant={'caption'}>Loading...</Typography></div>
                            : <ClassList
                                classes={this.state.classes}
                                updateClassInfo={this.handleUpdateClassInfoWished}
                                deleteClass={this.handleDeleteClass}/>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}