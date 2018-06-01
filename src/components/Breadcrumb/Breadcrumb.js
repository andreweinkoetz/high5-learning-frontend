import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const style = {
    breadcrumb: {
        paddingLeft: '25px'
    }
};

const Breadcrumb = (props) => {
    const {classes} = props;

    return <div className={classes.breadcrumb}>
        {props.breadcrumbs.map((val, index) =>
            <Link
                key={index}
                to={
                    {
                        pathname: val.link,
                        state:
                            {
                                title: val.linkName,
                                id: val.id
                            }
                    }
                }>{val.linkName} > </Link>)}</div>
};

export default withStyles(style)(Breadcrumb);