import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import SchoolService from '../../services/SchoolService';
import ClassService from '../../services/ClassService';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        flexGrow: 1,
        maxWidth: 600,
        position: 'relative'
    },
    paper: {
        position: 'relative',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    }
});
// these three functions are needed for the Downshift
function renderInput (inputProps) {
    const {InputProps, classes, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion ({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion._id}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.username}
        </MenuItem>
    );
}

function getSuggestions (availableStudentsOfSchoolForSelection, inputValue) {
    let count = 0;

    return availableStudentsOfSchoolForSelection.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

// modal dialog which appears when teacher either wants to create or update a class
class ModalDialogClass extends Component {
    constructor(props) {
        super(props);
        this.state = { // information of the class which should be added or updated, is updated dynamically when teacher changes something in dialog
            class: {
                title: '',
                description: '',
                students: []
            },
            inputValue: '',
            availableStudentsOfSchoolForSelection: [], // array with the available students of a school, which are possible to add to the class (is calculated with: all students of school - students already in class)
            allStudentsOfSchool: [], // array with all students of a school, needed for the suggestions in the downshift
            errorState: false // defines whether creating or updating a class is done correctly: becomes true when teacher forgot required information (title of class)

        };
        this.updateClass = this.updateClass.bind(this);
        this.addNewClass = this.addNewClass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {

        SchoolService.getStudentsOfSchool("no").then(users => { // before the component is mounted, all the students of the school are fetched
            this.setState({ // in the beginning both availableStudentsOfSchoolForSelection and allStudentsOfSchool contain all students
                availableStudentsOfSchoolForSelection: users,
                allStudentsOfSchool: users
            });
        }).catch(e => this.props.handleNotification(e));

    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!prevProps.visible && this.props.visible) { // when teacher wants to either create or update a class, this.props.visible is true & prevProps.visible false
            if ((!prevProps.updateWished && this.props.updateWished)) { // when teacher want to update a class, this.props.updateWished is true & prevProps.updateWished = false
                const infoOfUpdatedClass = this.props.informationOfClassToBeUpdated; //  this is done so that the title, description and students of the to be updated class are shown when updating. infoOfUpdatedClass has also all the students of a class
                let availableStudentsOfSchoolForSelection = [...this.state.allStudentsOfSchool]; // first you take all students of the school as basis
                infoOfUpdatedClass.students.forEach(function (c) { // then every student, who is already participant in class, gets deleted from availableStudentsOfSchoolForSelection, so that you can't add a student twice
                    let student = availableStudentsOfSchoolForSelection.find(s => s._id === c._id);
                    availableStudentsOfSchoolForSelection.splice(availableStudentsOfSchoolForSelection.indexOf(student),1);
                });

                this.setState({ // state for class, availableStudentsOfSchoolForSelection & inputValue is set (inputValue is empty, so that previous unfinished key inputs in downshift won't be shown in dialog)
                    class: infoOfUpdatedClass,
                    availableStudentsOfSchoolForSelection: [...availableStudentsOfSchoolForSelection],
                    inputValue: ''
                });
            }
            else { // in case teacher doesn't want to update a class, everything is set to default (meaning empty except for availableStudentsOfSchoolForSelection, this is set to all students of a school)
                this.setState({
                    class: {
                        title: '',
                        description: '',
                        students: []
                    },
                    availableStudentsOfSchoolForSelection: [...this.state.allStudentsOfSchool],
                    inputValue: ''
                })
            }
        }

    };

    addNewClass(classToAdd) { // method for adding a new class

        ClassService.addNewClass(classToAdd).then(() => { // class to add is sent to backend
            this.props.handleChangesOfClasses(); // if creating class was successful in backend, this triggers a render update so that new class is shown
        }).catch((e) => this.props.handleNotification(e));

    };

    updateClass(classToUpdate) { // method for updating a class

        ClassService.updateClass(classToUpdate, this.props.idOfToBeUpdatedClass).then(() => { // class to update is sent to backend
            this.props.handleChangesOfClasses(); // if updating class was successful in backend, this triggers a render update so that updated class is shown
        }).catch(e => this.props.handleNotification(e));

    };

    handleSubmit() { // method, which is called when teacher wants to submit new or updated class
        const clas = {...this.state.class}; // input from teacher (class spelled wrong, because class you can't name a variable class)
        if (clas.title === '') { // if the title is missing, errorState becomes true and notification is shown
            this.setState({errorState: true});
            this.props.handleNotification({
                title: 'No title',
                msg: 'Your class must have a title.',
                code: 12,
                variant: 'warning'
            });
        } else { // if title isn't missing...
            if (this.props.updateWished) { // ...you either update class...
                this.updateClass(clas);
            }
            else { // ...or add a new class
                this.addNewClass(clas);
            }
        }
    }

    handleInputChange = (event) => { // invoked when teacher types in or deletes something in downshift
        this.setState({inputValue: event.target.value});
    };

    handleSelectionChange = (item) => { // invoked when teacher selects student to be added to class in downshift

        let clas = {...this.state.class};
        let classStudents = [...clas.students];
        classStudents = [...classStudents, item]; // selected student (item) is added to class...
        clas.students = classStudents;

        let availableStudentsOfSchoolForSelection = [...this.state.availableStudentsOfSchoolForSelection];
        const chosenStudent = availableStudentsOfSchoolForSelection.find(s => s._id === item._id);
        availableStudentsOfSchoolForSelection.splice(availableStudentsOfSchoolForSelection.indexOf(chosenStudent), 1); // ...and deleted from availableStudentsOfSchoolForSelection, so that you can't find him/her anymore in the suggestions

        this.setState({
            inputValue: '', // also inputValue is set to empty, so that you can type in a new name
            class: clas,
            availableStudentsOfSchoolForSelection: availableStudentsOfSchoolForSelection
        });
    };

    handleDelete = (item) => () => { // invoked when teacher wants to delete an already selected student

        let clas = {...this.state.class};
        let classStudents = [...clas.students];
        classStudents.splice(classStudents.indexOf(item), 1); // to be deleted student (item) is deleted from class to add...
        clas.students = classStudents;

        let availableStudentsOfSchoolForSelection = [...this.state.availableStudentsOfSchoolForSelection];
        availableStudentsOfSchoolForSelection.push(item); // ...and pushed into the availableStudentsOfSchoolForSelection array, so that you can select him/her again from the suggestions

        this.setState({
            class: clas,
            availableStudentsOfSchoolForSelection: availableStudentsOfSchoolForSelection
        });
    };

    handleTitleChange = (event) => { // invoked when title of class is changed

        const clas = {...this.state.class};
        clas.title = event.target.value; // title of class is set

        this.setState({
            class: clas,
            errorState: false // teacher did somthing, so error state should be false
        });
    };

    handleDescriptionChange = (event) => { // invoked when description of class is changed

        const clas = {...this.state.class};
        clas.description = event.target.value; // description of class is set

        this.setState({class: clas});
    };

    render() {
        const {classes} = this.props;
        const {inputValue, clas} = this.state;

        return (
            <Dialog
                style={{minWidth: 300}}
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.visible} // only visible if teacher presses "add new class" or "update class" button
                onExited={this.props.onExitModal}
            >
                {this.props.updateWished
                    ?
                    <DialogTitle>Update class</DialogTitle>
                    :
                    <DialogTitle>Create new class</DialogTitle>}
                <DialogContent>
                    <TextField // title
                        className={classes.inputs}
                        fullWidth
                        error={this.state.errorState}
                        onChange={this.handleTitleChange}
                        label="Title"
                        value={this.state.class.title}
                        helperText="Required"
                        multiline
                    />
                </DialogContent>
                <DialogContent>
                    <TextField // description
                        fullWidth
                        onChange={this.handleDescriptionChange}
                        value={this.state.class.description}
                        label="Description"
                        multiline
                    />
                </DialogContent>
                <DialogContent style={{minWidth: 200}}>
                    <Downshift inputValue={inputValue} onChange={this.handleSelectionChange} selectedItem={clas.students}
                               itemToString={(item) => (item.username)}>
                        {({
                              getInputProps,
                              getItemProps,
                              isOpen,
                              inputValue: inputValue2,
                              selectedItem: selectedItem2,
                              highlightedIndex
                          }) => (<div className={classes.container}>
                                {renderInput({
                                    fullWidth: true,
                                    classes,
                                    InputProps: getInputProps({
                                        startAdornment: clas.students.map(item => ( // for every student which is already selected, create a chip
                                            <Chip
                                                key={item._id}
                                                tabIndex={-1}
                                                label={item.username}
                                                className={classes.chip}
                                                onDelete={this.handleDelete(item)}
                                            />
                                        )),
                                        onChange: this.handleInputChange,
                                        placeholder: 'Select students',
                                        id: 'integration-downshift-multiple',
                                    }),
                                })}
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(this.state.availableStudentsOfSchoolForSelection, inputValue2).map((suggestion, index) => // get suggestions for students
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({item: suggestion}),
                                                highlightedIndex,
                                                selectedItem: selectedItem2,
                                            }),
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        )}
                    </Downshift>
                </DialogContent>
                <DialogActions>
                    {this.props.updateWished
                        ?
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.handleSubmit}
                        >Update Class</Button>
                        :
                        <Button
                            color={"primary"}
                            variant={"raised"}
                            onClick={this.handleSubmit}
                        >Create Class</Button>}
                    <Button
                        color={"secondary"}
                        variant={"raised"}
                        onClick={this.props.toggle}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ModalDialogClass);