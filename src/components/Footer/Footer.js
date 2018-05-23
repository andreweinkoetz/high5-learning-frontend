import React from 'react';
import Styled from 'styled-components';


class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <hr/>
                <p>© {new Date().getFullYear()} High-5-Learning. All rights reserved.</p>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    padding-bottom: 30px;
    background: white;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;