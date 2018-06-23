import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

import CustomTooltip from './CustomTooltip';


export default class SubmissionChart extends React.Component {


    render() {

        // data is from the map/reduce getStatisticsForHomework() of the submission controller
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

