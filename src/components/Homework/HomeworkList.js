import React from 'react';

import Homework from './Homework';
import UserService from '../../services/UserService';

// Is used to map the array of homework into single JSX elements
const HomeworkList = (props) => {

    return (
        <div>
            {props.homework.map((obj) => {
                if (!UserService.isTeacher() && !obj.visible) { // do not display invisible homework for students!
                    return null;
                }
                const submitted = (props.submissions.findIndex(x => {
                    return (x.homework === obj._id);
                }) !== -1);

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
                        makeHomeworkInvisible={props.makeHomeworkInvisible} // not used
                        makeHomeworkVisible={props.makeHomeworkVisible} // not used
                        changeSwitch={props.changeSwitch}
                        isSubmitted={submitted}
                        rank={props.homeworkRanking ? props.homeworkRanking[obj._id] : -1}
                    />
                )
            })}
        </div>
    );
};

export default HomeworkList;