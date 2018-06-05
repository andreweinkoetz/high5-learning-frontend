import React from 'react';

import ExerciseSolutionTeacher from "./ExerciseSolutionTeacher";


const ExerciseList = (props) => {

    return (
        <div>
            {props.exercises.map((obj, k) => {

                return (
                    <ExerciseSolutionTeacher
                        percentage={props.percentage[k]}
                        rightSolution={obj.rightSolution}
                        key={obj._id}
                        id={obj._id}
                        question={obj.question}
                        answers={obj.answers}
                        answerKey={k}
                    />
                )
            })}
        </div>
    );
};

export default ExerciseList;