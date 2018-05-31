import React from 'react';

import Exercise from "./Exercise";


const ExerciseList = (props) => {

    return (
        <div>
            {props.exercises.map((obj, k) => {

                return (
                    <Exercise
                        key={obj._id}
                        id={obj._id}
                        question={obj.question}
                        answers={obj.answers}
                        answerKey={k}
                        handleSelection={props.handleSelection}
                        selectedValue={props.selectedValues[k]}/>
                )
            })}
        </div>
    );
};

export default ExerciseList;