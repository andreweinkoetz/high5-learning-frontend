import React from 'react';
import {LineChart, Line, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

export default class SubmissionChart extends React.Component {

    render() {
        const data = [
            {date: '2018-05-01', num: 4},
            {date: '2018-05-02', num: 6},
            {date: '2018-05-03', num: 1},
            {date: '2018-05-04', num: 10},
            {date: '2018-05-06', num: 12},
            {date: '2018-05-07', num: 1},
            {date: '2018-05-09', num: 0},
        ];
        return (
            <div style={{
                paddingBottom: '30%', /* 16:9' 56.25%' */
                position: 'relative',
                height: 0
            }}>

                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '-15px',
                    width: '100%',
                    height: '100%'
                }}>
                    <ResponsiveContainer>
                        <LineChart style={{marginBottom: '20px', marginTop: '20px'}}
                                   width={800} height={100} data={data}>
                            <Line type="monotone" dataKey="num" stroke="#8884d8"/>
                            <XAxis dataKey="date" scale="auto"/>
                            <YAxis/>
                            <Legend/>
                            <Tooltip content="bla"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        );

    }
};

