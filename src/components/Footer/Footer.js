import React from 'react';
// import Styled from 'styled-components';
import './Footer.css'

class Footer extends React.Component {

    render() {
        return (
            <div className={"footer"}>
                <p>© {new Date().getFullYear()} High-5-Learning. All rights reserved.</p>
            </div>

        );
    }
}

export default Footer;

/*export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    padding-bottom: 30px;
    background: #03A9F4;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;*/