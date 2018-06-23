import React from 'react';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './Breadcrumb.css';

// Breadcrumb component to help the user with orientation in our application
const Breadcrumb = (props) => {

    return (
        <Grid className="breadcrumb" container alignContent={"center"}>
        {props.breadcrumbs.map((val, index) =>
            <Grid key={index} item><Link
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