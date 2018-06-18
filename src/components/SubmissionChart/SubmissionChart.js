import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

import CustomTooltip from './CustomTooltip';


export default class SubmissionChart extends React.Component {


    render() {
            /*const data = [
                {date: '2018-05-01', num: 4},
                {date: '2018-05-02', num: 6},
                {date: '2018-05-03', num: 1},
                {date: '2018-05-04', num: 10},
                {date: '2018-05-06', num: 12},
                {date: '2018-05-07', num: 1},
                {date: '2018-05-09', num: 0},
            ];*/

      var data = this.props.submissionStatistics;

        return (

            <div  style={{
                paddingBottom: '30%', /* 16:9' 56.25%' */
                position: 'relative',
                height: 0,
                fontSize: '14px'
            }}>

                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '-15px',
                    width: '100%',
                    height: '100%'
                }}>
                    <ResponsiveContainer>
                        <LineChart   style={{marginBottom: '20px', marginTop: '20px'}}
                                   width={800} height={100} data={data} className={"linechart"}>
                            <Line type="monotone" dataKey="count" />
                            <XAxis dataKey="_id.date" scale="auto" />
                            <YAxis/>
                            <Tooltip  content={<CustomTooltip data={this.props.submissionStatistics}/>}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>


        );

    }
};

