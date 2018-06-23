import React from 'react';
import Class from './Class';

// Is used to map the array of classes into single JSX elements
const ClassList = (props) => {

    return (
            <div>
                {props.classes.map((obj) => {
                    return (
                        <Class key={obj._id} id={obj._id} title={obj.title} description={obj.description}
                               studentCount = {obj.students.length}
                               updateClassInfo={props.updateClassInfo}
                               openHomework={props.openHomework ? props.openHomework[obj._id] : undefined}
                               createdAt={obj.createdAt}
                               deleteClass={props.deleteClass}/>
                    )

                })}
            </div>
    );
};

export default ClassList;