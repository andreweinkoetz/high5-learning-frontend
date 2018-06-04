import React from 'react';

import ExerciseSolutionStudent from "./ExerciseSolutionStudent";


const ExerciseList = (props) => {

    return (
        <div>
            {props.exercises.map((obj, k) => {

                return (
                    <ExerciseSolutionStudent
                        selectedChoice={props.selectedChoice[k]}
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