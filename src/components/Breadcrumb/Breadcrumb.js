import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './Breadcrumb.css';

const Breadcrumb = (props) => {

    return (
        <Grid className="breadcrumb" container xs={12} sm={12} alignContent={"center"}>
        {props.breadcrumbs.map((val, index) =>
            <Grid item><Link
                key={index}
                className="link"
                to={
                    {
                        pathname: val.link,
                        state:
                            {
                                title: val.linkName,
                                id: val.id
                            }
                    }
                }>{val.linkName}</Link><ArrowRight className="arrowRight"/> </Grid>)}
        </Grid>)
};

export default Breadcrumb;