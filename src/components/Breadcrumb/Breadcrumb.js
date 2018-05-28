import React from 'react';
import './Breadcrumb.css'

const Breadcrumb = (props) => {

    const navigation = props.sites.map((k) => {
       return k + ">";
    });

    return (<div className={"breadcrumb"}>{navigation}</div>);

};

export default Breadcrumb;