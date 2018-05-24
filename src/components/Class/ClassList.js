import React from 'react';
import {ExpansionList} from 'react-md';
import ClassDetail from './ClassDetail';

const ClassList = (props) => {

    return (

        <div>
            <h1>Classes</h1>
            <hr/>
            {props.classes.map(obj => {

                return (

                    <ExpansionList>
                        <ClassDetail id={obj.id} title={obj.title} description={obj.description} url={obj.URL}
                                     password={obj.password}/>
                    </ExpansionList>

                )

            })}
        </div>);
}

export default ClassList;