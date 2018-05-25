import React from 'react';
import {ExpansionList} from 'react-md';
import ClassDetail from './ClassDetail';

const ClassList = (props) => {

    return (
            <ExpansionList component={"ul"} recalculateThreshold={80}>
                {props.classes.map((obj) => {

                    return (
                        <ClassDetail key={obj.id} id={obj.id} title={obj.title} description={obj.description}
                                     url={obj.URL}
                                     password={obj.password}/>
                    )

                })}
            </ExpansionList>
    );
}

export default ClassList;