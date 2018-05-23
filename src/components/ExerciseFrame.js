import React from 'react';
import {ExerciseChoices} from './ExerciseChoices';

export class ExerciseFrame extends React.Component {
    constructor(props) {
        super(props);
        const choices = {
            description: 'What is the solution of 1 + 1?',
            choices: [
                {id: 'choice_1', solution: 2},
                {id: 'choice_2', soultion: 4},
                {id: 'choice_3', solution: 5},
                {id: 'choice_4', solution: 6}
            ]
        };
    }
    render(){
        const { exercises } = this.props; //destructuring = const vote = this.props.vote;

        return(
            <div className="Choices Spacer">
                <div className="Head">
                    <h1 className="Exercise Description">
                        {this.props.choices.description}
                    </h1>
                </div>
                <div>
                    {<ExerciseChoices choices={this.props.choices.choices}/>}
                    </div>
            </div>

        );
    }
}



