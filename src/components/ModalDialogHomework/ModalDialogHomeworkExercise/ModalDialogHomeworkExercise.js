import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ModalDialogHomeworkExercise = (props) => {

    return (
        <div>
            <DialogContent>
                <TextField
                    label={"Exercise " + props.id}
                    onChange={props.changeQuestion(props.id)}
                    error={props.errorExerciseQuestion}
                    helperText="Required"
                    required={true}
                    multiline
                    fullWidth={true}
                    value={props.questionValue}
                />
            </DialogContent>
            <DialogContent>
                <RadioGroup
                    value={String(props.radioValue)}
                    onChange={props.changeRadioValue(props.id)}
                    row={true}>
                    <FormControlLabel
                        control={<Radio/>}
                        label={<TextField
                            multiline
                            onChange={props.changeAnswers(props.id, 0)}
                            error={props.errorExerciseAnswers[0]}
                            label="Answer 1"
                            helperText="Required"
                            required={true}
                            value={props.answersValues[0]}
                        />}
                        value={"0"}
                    />
                    <FormControlLabel
                        control={<Radio/>}
                        label={<TextField
                            label="Answer 2"
                            onChange={props.changeAnswers(props.id, 1)}
                            error={props.errorExerciseAnswers[1]}
                            multiline
                            helperText="Required"
                            required={true}
                            value={props.answersValues[1]}
                        />}
                        value={"1"}
                    />
                    <FormControlLabel
                        control={<Radio/>}
                        label={<TextField
                            onChange={props.changeAnswers(props.id, 2)}
                            error={props.errorExerciseAnswers[2]}
                            multiline
                            label="Answer 3"
                            helperText="Required"
                            required={true}
                            value={props.answersValues[2]}
                        />}
                        value={"2"}
                    />
                    <FormControlLabel
                        control={<Radio/>}
                        label={<TextField
                            onChange={props.changeAnswers(props.id, 3)}
                            error={props.errorExerciseAnswers[3]}
                            multiline
                            label="Answer 4"
                            helperText="Required"
                            required={true}
                            value={props.answersValues[3]}
                        />}
                        value={"3"}
                    />
                </RadioGroup>
                {props.ableToDeleteExercises ? <Grid container justify={"center"}>
                    <DialogActions>
                        <Button
                            color={"secondary"}
                            variant={"raised"}
                            onClick={props.handleDeleteExercise(props.id)}
                        >Delete exercise {props.id}</Button>
                    </DialogActions>
                </Grid> : null}
            </DialogContent>
        </div>
    )
}

export default ModalDialogHomeworkExercise;