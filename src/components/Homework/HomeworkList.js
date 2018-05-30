import React from 'react';

import Homework from './Homework';

//this component contains the list of all exercises

const HomeworkList = (props) => {

    return (
        <div>
            {props.homework.map((obj) => {
                return (<Homework key={obj._id} id={obj._id} title={obj.title}></Homework>)
            })}
        </div>
    );
};

export default HomeworkList;