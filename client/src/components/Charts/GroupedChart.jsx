import React from 'react'
import { Bar } from "@nivo/bar";
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(4),
            width: theme.spacing(16),
            height: theme.spacing(25),
        },
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    }
}));

export default function GroupedChart({ chartedList }) {
    const classes = useStyles();
    const keys = ['consumed', 'supplied', 'estimate']
    // const commonProps = {
    //     width: 900,
    //     height: 500,
    //     margin: { top: 60, right: 80, bottom: 60, left: 80 },
    //     data: chartedList,
    //     indexBy: 'ingredient',
    //     keys,
    //     padding: 0.2,
    //     labelTextColor: 'inherit:darker(1.4)',
    //     labelSkipWidth: 16,
    //     labelSkipHeight: 16,
    // }

    const groupedChart = (
        (chartedList)
            ? (
                <Paper className={classes.paper}>
                <div style={{ height: 490, width: 550 }}>
                    <Bar
                        width={800}
                        height={500}
                        margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
                        data={chartedList}
                        indexBy="ingredient"
                        keys={keys}
                        labelTextColor="inherit:darker(1.4)"
                        enableGridX={true}
                        labelSkipWidth={16}
                        labelSkipHeight={16}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 1,
                            tickRotation: 0,
                            legend: 'Ingredients',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Units',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}

                        animate={true}
                        theme={{
                            axis: {
                                ticks: {
                                    line: {
                                        stroke: "green"
                                    },
                                    text: {
                                        fill: "red"
                                    }
                                }
                            },
                            grid: {
                                line: {
                                    stroke: "pink",
                                    strokeWidth: 2,
                                    strokeDasharray: "4 4"
                                }
                            }
                        }}
                    />
                </div>
                <div>Consume & Supply Relationship</div>
                </Paper>

            ) : null
    )

    return (chartedList) && (chartedList.length === 0)
        ? <Paper className={classes.paper}>
            <div>No Data on Consume & Supply Relationship</div>
        </Paper>
        : groupedChart

}

