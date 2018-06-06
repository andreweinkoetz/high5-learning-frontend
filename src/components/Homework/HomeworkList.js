import React from 'react';

import Homework from './Homework';

//this component contains the list of all exercises

const HomeworkList = (props) => {

    return (
        <div>
            {props.homework.map((obj) => {
                console.log(obj.visible);
                return (<Homework
                    key={obj._id}
                    id={obj._id} c
                    lassId={props.classId}
                    classTitle={props.classTitle}
                    title={obj.title}
                    updateHomeworkTitle={props.updateHomeworkTitle}
                    deleteHomework={props.deleteHomework}
                    homeworkVisible={obj.visible}
                    makeHomeworkInvisible={props.makeHomeworkInvisible}
                    makeHomeworkVisible={props.makeHomeworkVisible}>
                </Homework>)
            })}
        </div>
    );
};

export default HomeworkList;