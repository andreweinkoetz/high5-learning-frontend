import React from 'react';

import ExerciseSolutionTeacher from "./ExerciseSolutionTeacher";


const ExerciseListEmpty = (props) => {

    return (
        <div>
            {props.exercises.map((obj, k) => {
                return (
                    <ExerciseSolutionTeacher
                        percentage={props.percentage}
                        selectedStudent={props.selectedStudent}
                        rightSolution={obj.rightSolution}
                        key={obj._id}
                        id={obj._id}
                        question={obj.question}
                        answers={obj.answers}
                        answerKey={k}
                        empty={props.empty}

                    />
                )
            })}
        </div>
    );
};

export default ExerciseListEmpty;