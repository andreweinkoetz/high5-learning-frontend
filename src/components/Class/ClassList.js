import React from 'react';
import Class from './Class';


const ClassList = (props) => {

    return (
            <div>
                {props.classes.map((obj) => {

                    return (
                        <Class key={obj._id} id={obj._id} title={obj.title} description={obj.description}
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