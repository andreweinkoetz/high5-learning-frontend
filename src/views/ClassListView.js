import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import ClassList from '../components/Class/ClassList';
import ClassService from '../services/ClassService';
import ModalDialogNewClass from '../components/ModalDialogNewClass/ModalDialogNewClass'


export class ClassListView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showModal: false,
            errorModal: false,
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

        ClassService.getClassesOfUser().then((data) => {
            this.setState({
                classes: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }


    toggleModal() {
        const oldState = this.state.showModal;
        this.setState({showModal: !oldState});
    }

    handleSubmitModal() {

        const classToAdd = {...this.state.classToAdd};

        if (classToAdd.title === '') {
            this.setState({modalError: true});
        } else {
            this.addNewClass(classToAdd);
        }
    }

    handleTitleChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.title = event.target.value;
        this.setState({classToAdd: newClass});
    }

    handleDescriptionChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.description = event.target.value;
        this.setState({classToAdd: newClass});
    }


    addNewClass(classToAdd) {

        ClassService.addNewClass(classToAdd).then((newClass) => {
                const newClasses = [...this.state.classes, newClass];

                this.setState({classes: newClasses});
                this.toggleModal();

            }
        ).catch(e => alert(e));
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
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
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My classes</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Grid container spacing={0} align={'right'}>
                            <Grid item xs={12}>
                                <Hidden only={'xs'}>
                                    <Button variant="raised" color="primary" onClick={this.toggleModal}>
                                        <AddIcon/>
                                        Add new class</Button>
                                </Hidden>
                                <Hidden smUp>
                                    <Button variant="fab" color="primary" aria-label="add" onClick={this.toggleModal}>
                                        <AddIcon/>
                                    </Button>
                                </Hidden>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}><ClassList classes={this.state.classes}/></Grid>
                </Grid>

            </div>
        );
    }
}