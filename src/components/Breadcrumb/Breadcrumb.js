import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const style = {
    breadcrumb: {
        paddingLeft: '15px'
    }
}

const Breadcrumb = (props) => {
    const{classes} = props;
        return <div className={classes.breadcrumb}>{props.url.map((u, index) =>
            <Link
                key={index}
            to={u.urlPartFull}
            style={{textDecoration: 'none', color: 'black'}}
        >{u.urlPart + " > "}</Link>)}</div>
    };

export default withStyles(style)(Breadcrumb);