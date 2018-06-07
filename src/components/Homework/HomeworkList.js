import React from 'react';

import Homework from './Homework';

//this component contains the list of all exercises

const HomeworkList = (props) => {

    return (
        <div>
            {props.homework.map((obj) => {
                return (<Homework
                    key={obj._id}
                    id={obj._id} c
                    classId={props.classId}
                    classTitle={props.classTitle}
                    title={obj.title}
                    updateHomeworkTitle={props.updateHomeworkTitle}
                    deleteHomework={props.deleteHomework}
                    homeworkVisible={obj.visible}
                    makeHomeworkInvisible={props.makeHomeworkInvisible}
                    makeHomeworkVisible={props.makeHomeworkVisible}
                    changeSwitch={props.changeSwitch}>
                </Homework>)
            })}
        </div>
    );
};

export default HomeworkList;