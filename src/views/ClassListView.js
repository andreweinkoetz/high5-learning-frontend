import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import ClassList from '../components/Class/ClassList';
import ClassService from '../services/ClassService';
import UserService from '../services/UserService';
import ModalDialogNewClass from '../components/ModalDialogNewClass/ModalDialogNewClass';
import ErrorNoTitleClassComponent from '../components/ErrorNoTitleClassComponent/ErrorNoTitleClassComponent';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";


export default class ClassListView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showModal: false,
            errorModal: false,
            errorNoTitle: false,
            classToAdd: {
                title: '',
                description: ''
            },
            classes: []
        };

        this.addNewClass = this.addNewClass.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        const lastPath = String(document.referrer).substring("http://localhost:3000/".length);

        if ((lastPath.substring(0,"goToClass".length)) === "goToClass") {
            window.location = document.referrer;
        };

        ClassService.getClassesOfUser().then((data) => {
            this.setState({
                classes: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    };

    componentDidMount(){
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
            modalError: errorStateWhenClickingAdd,
            classToAdd: classToAddWhenClickingAdd
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

    handleTitleChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.title = event.target.value;
        if (event.target.value !== "") {
            this.setState({modalError: false});
        }
        this.setState({classToAdd: newClass});
    };

    handleDescriptionChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.description = event.target.value;
        this.setState({classToAdd: newClass});
    };


    addNewClass(classToAdd) {

        ClassService.addNewClass(classToAdd).then((newClass) => {
                const newClasses = [...this.state.classes, newClass];

                this.setState({classes: newClasses});
                this.toggleModal();

            }
        ).catch(e => alert(e));
    };

    handleNoTitleErrorMessageRead = () => {
        const oldErrorState = this.state.errorNoTitle;
        this.setState({errorNoTitle: !oldErrorState});
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

        return (
            <div>
                <ModalDialogNewClass visible={this.state.showModal}
                                     handleTitleChange={this.handleTitleChange}
                                     handleDescriptionChange={this.handleDescriptionChange}
                                     handleSubmit={this.handleSubmitModal}
                                     toggle={this.toggleModal}
                                     error={this.state.modalError}
                                     title={this.state.classToAdd.title}
                                     description={this.state.classToAdd.description}
                />
                <ErrorNoTitleClassComponent
                    errorNoTitleRead={this.handleNoTitleErrorMessageRead}
                    visible={this.state.errorNoTitle}/>
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My classes</Typography>
                    </Grid>
                    {addClassButton}
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                    {this.state.loading ? <div style={{textAlign:'center', paddingTop:40}}><CircularProgress size={30}/>
                            <Typography variant={'caption'}>Loading...</Typography></div>
                        : <ClassList classes={this.state.classes}/> }
                </Grid>
                </Grid>
            </div>
        );
    }
}