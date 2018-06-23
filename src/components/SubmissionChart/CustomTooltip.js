import React from 'react';

import './CustomTooltip.css';

export default class CustomTooltip extends React.Component {
    // this statefull component displays the tooltip in the chart
    constructor(props) {
        super(props);

        this.getIntroOfPage = this.getIntroOfPage.bind(this);
    }

    getIntroOfPage(label) {
        const names = [];

        for (var i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i]._id.date.toString() === label) {
                this.props.data[i].students.forEach((obj) => {
                        names.push(obj.username)
                    }
                );
                return names.reverse().join("\n");
            }
        }
    };

    render() {
        if (this.props.data.length !== 0) {
            const {active} = this.props;

            if (active) {
                const {payload, label} = this.props;
                return (
                    <div className="custom-tooltip">

                        {/*display of date and count*/}
                        <p className="label">{`${label} : ${payload[0].value}`}</p>

                        <p className="desc">Students: </p>

                        {/*display of students submitted on the date*/}
                        <div className="intro">{this.getIntroOfPage(label)}</div>

                    </div>
                );
            }

            return null;
        }
        return <div></div>;
    }


}