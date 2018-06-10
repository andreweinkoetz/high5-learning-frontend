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
            classes: [],
            updateClassWished: false,
            idOfToBeUpdatedClass: '',
            studentsOfSchool: [],
            informationOfClassToBeUpdated: {
                title: '',
                description: '',
                students: []
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
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
        this.setState({
            showModal: !oldState,
            errorState: errorStateWhenClickingAdd,
            updateClassWished: false
        });
    };

    handleChangesOfClasses = () => {
        ClassService.getClassesOfUser().then((data) => {
            this.setState({
                classes: [...data],
                loading: false,
                showModal: false
            });
        }).catch((e) => {
            this.props.handleNotification(e);
        });
    };

    handleUpdateClassWished = (id, t, d) => {
        const updatedClass = {title: t, description: d};
        ClassService.getStudentsOfClass(id).then(students => {
            const studentsOfClass = students;
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
            const nClasses = [...newClasses];
            this.setState({classes: nClasses});
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
                toggle={this.toggleModal}
                studentsOfSchool={this.state.studentsOfSchool}
                updateWished={this.state.updateClassWished}
                handleNotification={this.props.handleNotification}
                informationOfClassToBeUpdated={this.state.informationOfClassToBeUpdated}
                idOfToBeUpdatedClass={this.state.idOfToBeUpdatedClass}
                handleChangesOfClasses={this.handleChangesOfClasses}/>
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
                                updateClassInfo={this.handleUpdateClassWished}
                                deleteClass={this.handleDeleteClass}/>}
                    </Grid>
                </Grid>
            </div>
        );
    }
}