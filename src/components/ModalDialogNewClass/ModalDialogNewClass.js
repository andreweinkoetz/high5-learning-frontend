import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import keycode from 'keycode';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import SchoolService from '../../services/SchoolService';
import ClassService from '../../services/ClassService';
import './ModalDialogNewClass.css';

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


function renderInput(inputProps) {
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

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
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

function getSuggestions(studentsOfSchool, inputValue) {
    let count = 0;

    return studentsOfSchool.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

class ModalDialogNewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classToAdd: {
                title: '',
                description: '',
                students: []
            },
            error: false,
            inputValue: '',
            studentsOfSchool: []
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        SchoolService.getStudentsOfSchool("no").then(users => {
            this.setState({studentsOfSchool: users});
            if (this.props.updateWished) { // this is done so that the title, description and students of the class are shown when updating
                const infoOfUpdatedClass = this.props.informationOfClassToBeUpdated; // in this props also the students of the class are saved
                this.setState({
                    classToAdd: infoOfUpdatedClass
                });
            }
        }).catch(e => this.props.handleNotification(e));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible && !this.props.visible) {
            this.setState({
                classToAdd: {
                    title: '',
                    description: '',
                    students: []
                }
            })
        }
    }

    addNewClass(classToAdd) {

        ClassService.addNewClass(classToAdd).then((newClass) => {
                this.props.handleChangesOfClasses();
            }
        ).catch(e => this.props.handleNotification(e));

    };

    updateClass(classToUpdate) {

        ClassService.updateClass(classToUpdate, this.props.idOfToBeUpdatedClass).then((updatedClass) => {
            this.props.handleChangesOfClasses();
        }).catch(e => this.props.handleNotification(e));

    };

    handleSubmit() {
        let classToAdd = {...this.state.classToAdd};
        if (this.props.updateWished) {
            this.updateClass(classToAdd);
        }
        else {
            if (classToAdd.title === '') {
                this.props.handleNotification({
                    title: 'No title',
                    msg: 'Your class must have a title.',
                    code: 12,
                    variant: 'warning'
                });
            } else {
                this.addNewClass(classToAdd);
            }
        }

        this.setState({
            classToAdd: {
                title: '',
                description: '',
                students: []
            }
        });
    }

    handleKeyDown = event => {
        const {inputValue, classToAdd} = this.state; // look if it doesn't work

        if (classToAdd.students.length && !inputValue.length && keycode(event) === 'backspace') {
            let newClassToAdd = classToAdd;
            newClassToAdd.students.slice(0, classToAdd.students.length - 1);
            this.setState({
                classToAdd: newClassToAdd,
            });
        }
    };

    handleInputChange = event => {
        this.setState({inputValue: event.target.value});
    };

    handleChange = item => {

        let classToAdd = {...this.state.classToAdd};

        let studentsOfSchool = [...this.state.studentsOfSchool];

        /*let itemIsInClassToAdd = false;

        classToAdd.students.forEach(function (i) {
            if (i._id === item._id) {
                itemIsInClassToAdd = true;
            }
        });

        if (!itemIsInClassToAdd) {
            classToAdd.students = [...classToAdd.students, item];
        }*/

        let classToAddStudents = [...classToAdd.students];
        classToAddStudents = [...classToAddStudents, item];
        classToAdd.students = classToAddStudents;

        const chosenStudent = studentsOfSchool.find(s => s._id === item._id);
        studentsOfSchool.splice(studentsOfSchool.indexOf(chosenStudent), 1);

        this.setState({
            inputValue: '',
            classToAdd: classToAdd,
            studentsOfSchool: studentsOfSchool
        });
    };

    handleDelete = item => () => {
        let classToAdd = {...this.state.classToAdd};
        let studentsOfSchool = [...this.state.studentsOfSchool];

        let classToAddStudents = [...classToAdd.students];
        classToAddStudents.splice(classToAddStudents.indexOf(item), 1);
        studentsOfSchool.push(item);

        classToAdd.students = classToAddStudents;
        this.setState({classToAdd: classToAdd, studentsOfSchool: studentsOfSchool});
    };

    handleTitleChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.title = event.target.value;
        if (event.target.value !== "") {
            this.setState({errorState: false});
        }
        this.setState({classToAdd: newClass});
    };

    handleDescriptionChange(event) {
        const newClass = {...this.state.classToAdd};
        newClass.description = event.target.value;
        this.setState({classToAdd: newClass});
    };

    render() {
        const {classes} = this.props;
        const {inputValue, classToAdd} = this.state;
        return (
            <Dialog
                style={{minWidth: 300}}
                disableBackdropClick
                disableEscapeKeyDown
                open={this.props.visible}
            >
                {this.props.updateWished
                    ?
                    <DialogTitle>Update class</DialogTitle>
                    :
                    <DialogTitle>Create new class</DialogTitle>}
                <DialogContent>
                    <TextField
                        className={classes.inputs}
                        fullWidth
                        error={this.state.error}
                        onChange={this.handleTitleChange}
                        label="Title"
                        value={this.state.classToAdd.title}
                        helperText="Required"
                        multiline
                        required={true}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        fullWidth
                        onChange={this.handleDescriptionChange}
                        value={this.state.classToAdd.description}
                        label="Description"
                        multiline
                    />
                </DialogContent>
                <DialogContent style={{minWidth: 200}}>
                    <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={classToAdd.students}
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
                                        startAdornment: classToAdd.students.map(item => (
                                            <Chip
                                                key={item._id}
                                                tabIndex={-1}
                                                label={item.username}
                                                className={classes.chip}
                                                onDelete={this.handleDelete(item)}
                                            />
                                        )),
                                        onChange: this.handleInputChange,
                                        onKeyDown: this.handleKeyDown,
                                        placeholder: 'Select students',
                                        id: 'integration-downshift-multiple',
                                    }),
                                })}
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(this.state.studentsOfSchool, inputValue2).map((suggestion, index) =>
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

export default withStyles(styles)(ModalDialogNewClass);