import React from 'react';

import Homework from './Homework';
import UserService from '../../services/UserService';

//this component contains the list of all exercises

const HomeworkList = (props) => {

    return (
        <div>
            {props.homework.map((obj) => {
                if(!UserService.isTeacher() && !obj.visible){
                    return null;
                }
                return (<Homework
                    key={obj._id}
                    id={obj._id} c
                    classId={props.classId}
                    classTitle={props.classTitle}
                    title={obj.title}
                    updateHomework={props.updateHomework}
                    deleteHomework={props.deleteHomework}
                    homeworkVisible={obj.visible}
                    createdAt={obj.createdAt}
                    makeHomeworkInvisible={props.makeHomeworkInvisible}
                    makeHomeworkVisible={props.makeHomeworkVisible}
                    changeSwitch={props.changeSwitch}>
                </Homework>)
            })}
        </div>
    );
};

export default HomeworkList;