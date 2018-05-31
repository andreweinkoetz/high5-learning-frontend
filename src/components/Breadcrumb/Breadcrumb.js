import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';


const style = {
    breadcrumb: {
        paddingLeft: '15px'
    }
}

const Breadcrumb = (props) => {
    const{classes} = props;
        return (<div className={classes.breadcrumb}>{props.url}</div>);
    };

export default withStyles(style)(Breadcrumb);