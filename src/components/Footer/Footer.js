import React from 'react';
import './Footer.css'
import Typography from '@material-ui/core/Typography';

class Footer extends React.Component {

    render() {
        return (
            <div className={"footer"}>
                <Typography gutterBottom>© {new Date().getFullYear()} High-5-Learning. All rights reserved.</Typography>
            </div>

        );
    }
}

export default Footer;
