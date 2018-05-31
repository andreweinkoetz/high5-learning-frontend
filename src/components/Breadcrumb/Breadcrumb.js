import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';


const style = {
    breadcrumb: {
        paddingLeft: '15px'
    }
}

class Breadcrumb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navigationSites: ""
        };
    };

    componentDidMount() {
        console.log("bla");
        let navigation = [];
        let url = String(window.location.href);
        url = url.substring("http://localhost:3000/".length);
        const urlParts = url.split("/");
        let i = 0;
        if (urlParts[0] === "myclasses") {
            navigation.push("My classes");
            if (urlParts.length > 1) {
                const userId = UserService.getCurrentUser().id;
                let classe;
                ClassService.getClassesOfUser().then((data) => {
                    classe = [...data];
                    let correspondingClass = classe.map((i) => {
                        if(i._id === urlParts[1]) {
                            return i;
                        }
                    });
                    if (correspondingClass !== null) {
                        console.log(correspondingClass[0]);
                        navigation.push(correspondingClass[0].title);
                        let n = navigation.map((k) => {
                            return k + ">";
                        });
                        this.setState({navigationSites: n});
                    };
                }).catch((e) => {
                    console.error(e);
                });
            }
            else {
                let n = navigation.map((k) => {
                    return k + ">";
                });
                this.setState({navigationSites: n});
            }
        };
    };

    render () {
        const{classes} = this.props;
        return (<div className={classes.breadcrumb}>{this.state.navigationSites}</div>);
    }

};

export default withStyles(style)(Breadcrumb);