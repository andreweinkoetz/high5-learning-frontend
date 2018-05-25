import React from 'react';

import ClassList from '../components/Class/ClassList';

import ClassService from '../services/ClassService';
import {Button, Cell, Grid} from "react-md";


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
                <Grid>
                    <Cell size={9} phoneSize={3} tabletSize={4}>
                        <h1>My classes</h1>
                    </Cell>
                    <Cell size={3} phoneHidden={true} tabletSize={4} style={{textAlign: "right"}}><Button
                        style={{marginBottom: '6px', marginTop: '6px', minHeight: '36px'}} raised primary>Add new
                        class</Button></Cell>
                    <Cell phoneSize={1} desktopHidden={true} tabletHidden={true} style={{textAlign: "right"}}><Button
                        floating primary mini>add</Button></Cell>
                    <Cell size={12} style={{marginTop: '-15px'}}>
                        <hr/>
                    </Cell>
                    <Cell size={12}><ClassList classes={this.state.data}/></Cell>
                </Grid>


            </div>
        );
    }
}