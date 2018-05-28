import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';

import HomeworkService from "../services/HomeworkService";
import ModalDialogNewHomework from '../components/ModalDialogNewHomework/ModalDialogNewHomework';


export default class ClassDetailView extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            loading: false,
            showModal: false,
            errorModal: false,
            homework: [],
            homeworkToAdd: {
                title: '',
                exercises: [{
                    question: '',
                    answers: ['','','',''],
                    rightSolution: -1,
                }]
            },
            currentClass: {
                title: '',
                id: ''
            }
        };

        this.addNewHomework = this.addNewHomework.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        HomeworkService.getHomeworkOfClass(this.props.match.params.id).then((data) => {
            this.setState({
                homework: [...data],
                loading: false,
                currentClass: {
                    title: this.props.location.state.title,
                    id: this.props.match.params.id
                }
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

        const homeworkToAdd = {...this.state.homeworkToAdd};

        if (homeworkToAdd.title === '') {
            this.setState({modalError: true});
        } else {
            this.addNewHomework(homeworkToAdd);
        }
    }

    handleTitleChange(event) {
        const newHomework = {...this.state.homeworkToAdd};
        newHomework.title = event.target.value;
        this.setState({homeworkToAdd: newHomework});
    }

    addNewHomework(homeworkToAdd) {

        HomeworkService.addNewHomework(homeworkToAdd).then((newHomwork) => {
                const newHomework = [...this.state.homework, newHomwork];

                this.setState({homework: newHomework});
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
                <ModalDialogNewHomework visible={this.state.showModal} handleCancel={this.toggleModal}/>
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My homework of {this.state.currentClass.title} </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Grid container spacing={0} align={'right'}>
                            <Grid item xs={12}>
                                <Hidden only={'xs'}>
                                    <Button variant="raised" color="primary" onClick={this.toggleModal}>
                                        <AddIcon/>
                                        Add new homework</Button>
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
                    <Grid item xs={12}>{this.state.homework}</Grid>
                </Grid>

            </div>
        );
    }
}