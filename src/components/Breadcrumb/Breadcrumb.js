import React from 'react';
import {withStyles} from '@material-ui/core/styles';


const style = {
    breadcrumb: {
        paddingLeft: '15px'
    }
}

const Breadcrumb = (props) => {

    const {classes} = props;

    const navigation = props.sites.map((k) => {
        return k + ">";
    });

    return (<div className={classes.breadcrumb}>{navigation}</div>);

};

export default withStyles(style)(Breadcrumb);