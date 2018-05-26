import React from 'react';

import ClassList from '../components/Class/ClassList';

import ClassService from '../services/ClassService';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from "@material-ui/core/es/Hidden/Hidden";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import AddIcon from '@material-ui/icons/Add';


export class ClassListView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ClassService.getClasses().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant={'title'}>My classes</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Grid container spacing={0} align={'right'}>
                            <Grid item xs={12}>
                                <Hidden only={'xs'}>
                                    <Button variant="raised" color="primary">
                                        <AddIcon/>
                                        Add new class</Button>
                                </Hidden>
                                <Hidden smUp>
                                    <Button variant="fab" color="primary" aria-label="add">
                                        <AddIcon />
                                    </Button>
                                </Hidden>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}><ClassList classes={this.state.data}/></Grid>
                </Grid>

            </div>
        );
    }
}