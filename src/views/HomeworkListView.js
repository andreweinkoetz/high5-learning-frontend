import React from 'react';
import HomeworkService from '../services/HomeworkService';


export class HomeworkListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

    }

    getHomeworkByClassID(id){
        HomeworkService.getHomework("5b0abf6cfda2f811b0dda0ef").then(
            x => {alert(x)}
        );
    }

    render(){
        return(<div>
            <button onClick={this.getHomeworkByClassID}>Click me</button></div>);
    }
}