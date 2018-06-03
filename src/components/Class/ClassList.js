import React from 'react';
import Class from './Class';

import config from '../../config';


const ClassList = (props) => {

    return (
            <div>
                {props.classes.map((obj) => {

                    return (
                        <Class key={obj._id} id={obj._id} title={obj.title} description={obj.description}
                               url={config.baseUrlFrontend + '/goToClass/' + obj._id}
                               password={obj.password}
                               updateClassInfo={props.updateClassInfo}
                               deleteClass={props.deleteClass}/>
                    )

                })}
            </div>
    );
};

export default ClassList;