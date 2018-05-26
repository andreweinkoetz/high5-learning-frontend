import React from 'react';
import Class from './Class';

const ClassList = (props) => {

    return (
            <div>
                {props.classes.map((obj) => {

                    return (
                        <Class key={obj.id} id={obj.id} title={obj.title} description={obj.description}
                               url={obj.URL}
                               password={obj.password}/>
                    )

                })}
            </div>
    );
}

export default ClassList;