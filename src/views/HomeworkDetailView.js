import React from 'react';

import UserService from '../services/UserService';
import HomeworkDetailViewStudent from './HomeworkDetailViewStudent';
import HomeworkDetailViewTeacher from './HomeworkDetailViewTeacher';

/* this functional component is just a wrapper to check if a student or teacher is looking at the homework details */

const HomeworkDetailView = (props) => {
    let isStudent;

    UserService.getCurrentUser().type === 'Student' ? isStudent = true : isStudent = false;
    console.log(isStudent)
    return (isStudent ? <HomeworkDetailViewStudent {...props}/> : <HomeworkDetailViewTeacher {...props}/>);
};

export default HomeworkDetailView;