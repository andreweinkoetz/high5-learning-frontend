import React from 'react';

import ClassList from '../components/Class/ClassList';

import ClassService from '../services/ClassService';


export class ClassListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
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
            <ClassList classes={this.state.data} />
        );
    }
}