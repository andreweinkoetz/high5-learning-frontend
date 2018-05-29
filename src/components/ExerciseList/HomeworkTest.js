import React from 'react';
import ExerciseList from './ExerciseList'

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

export class HomeworkTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: "",
            exercises: [],
            homework: ""
        };
    }

    //this function updates the selected choices in the exercises array
    changeSelectedChoices() {

    }


    handleSubmit() {

    }

    handleBack() {

    }

    render() {

        const dummyHW =
            {
                title: "Algegra 1",
                exercises: [
                    {
                        question: "What is 1 + 1?",
                        answers: ["3", "4", "5", "2"],
                        rightSolution: 3
                    },
                    {
                        question: "What is 2 + 4?",
                        answers: ["3", "5", "6", "2"],
                        rightSolution: 2
                    }

                ]

            };

        return (


            <div>
                <h1>{dummyHW.title}</h1>

                <ExerciseList
                    changeSelectedChoices={() => this.changeSelectedChoices}
                    {...dummyHW} />

                <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={this.handleBack}
                        >Back</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={this.handleSubmit}
                        >Submit</Button>
                    </DialogActions>
                </Grid>
            </div>

        );

    }
}