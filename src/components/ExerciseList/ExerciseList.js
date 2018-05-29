import React from 'react';
import {ExerciseChoices} from "../ExerciseChoice/ExerciseChoices";


//this component contains the list of all exercises

const ExerciseList = (props) => {

    return (
        <div>
            {props.exercises.map((obj) => {

                return (
                    <div><ExerciseChoices
                        //changeRadio={this.props.changeSelectedChoices}
                        key={obj._id}
                        id={obj._id}
                        question={obj.question}
                        answers={obj.answers}/>
                    </div>
                )

            })}
        </div>
    );
};

export default ExerciseList;