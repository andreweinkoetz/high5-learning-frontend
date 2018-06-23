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
            showModal: false,
            classes: [],
            updateClassWished: false,
            idOfToBeUpdatedClass: '',
            studentsOfSchool: [],
            informationOfClassToBeUpdated: {
                title: '',
                description: '',
                students: []
            },
            openHomework: {}
        };

        this.toggleModal = this.toggleModal.bind(this);
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
                if (openHw) {
                    this.setState({
                        openHomework: {...openHw},
                        loading: false
                    })
                }
            })
            .catch(
                (e) => {
                    this.props.handleNotification(e);
                }
            );
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
        this.setState({
            showModal: !oldState,
            errorState: errorStateWhenClickingAdd,
            updateClassWished: false
        });
    }
    ;

    handleChangesOfClasses = () => {
        const oldState = this.state.showModal;
        ClassService.getClassesOfUser().then((data) => {
            this.props.updateNavBar(data);
            this.setState({
                classes: [...data],
                showModal: !oldState
            });
        }).catch((e) => {
            this.props.handleNotification(e);
        });
    };

    handleOnExitModal = () => {
        this.setState({updateClassWished: false})
    };

    handleUpdateClassWished = (id, t, d) => {
        ClassService.getStudentsOfClass(id).then(students => {
            const informationOfClassToBeUpdated = {title: t, description: d, students: students};
            this.setState({
                showModal: true,
                updateClassWished: true,
                idOfToBeUpdatedClass: id,
                informationOfClassToBeUpdated: informationOfClassToBeUpdated
            });
        })
    };

    handleDeleteClass = (id) => {
        ClassService.deleteClass(id).then((newClasses) => {
            this.props.updateNavBar(newClasses);
            const nClasses = [...newClasses];
            this.setState({classes: nClasses});
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
                    handleChangesOfClasses={this.handleChangesOfClasses}
                    onExitModal={this.handleOnExitModal}/>
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