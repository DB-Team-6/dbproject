import React from 'react'
import { ResponsivePie } from "@nivo/pie";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
// const data = [
//     {
//         "id": "c",
//         "label": "c",
//         "value": 206,
//         "color": "hsl(50, 70%, 50%)"
//     },
//     {
//         "id": "haskell",
//         "label": "haskell",
//         "value": 357,
//         "color": "hsl(331, 70%, 50%)"
//     },
//     {
//         "id": "lisp",
//         "label": "lisp",
//         "value": 419,
//         "color": "hsl(341, 70%, 50%)"
//     },
//     {
//         "id": "erlang",
//         "label": "erlang",
//         "value": 85,
//         "color": "hsl(259, 70%, 50%)"
//     },
//     {
//         "id": "hack",
//         "label": "hack",
//         "value": 594,
//         "color": "hsl(266, 70%, 50%)"
//     }
// ]


export default function PieChart({ data }) {
    const classes = useStyles();
    const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
        let total = 0
        dataWithArc.forEach(datum => {
            total += datum.value
        })

        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '35px',
                    fontWeight: '600',
                }}
            >
                ${total}
            </text>
        )
    }

    const pieChart = (
        (data)
            ? (<Paper className={classes.paper}>
                <div>Profit margins</div>
                <div style={{ height: 390, width: 550 }}>
                    <ResponsivePie
                        data={data}
                        margin={{ top: 80, right: 50, bottom: 40, left: 55 }}
                        innerRadius={0.68}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                        valueFormat={value =>
                            `$${Number(value).toLocaleString('ru-RU', {
                                minimumFractionDigits: 0,
                            })}`
                        }
                        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'labels', CenteredMetric]}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'Classic Pizza'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Neapoli Pizza'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Sicilian Pizza'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Greek Pizza'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'Philly Pizza'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'Honolulu Pizza'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'Ultimate Pizza'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'Spinach Pizza'
                                },
                                id: 'lines'
                            }
                        ]}

                    />
                </div>
                
            </Paper>
            ) : null
    )

    return (data) && (data.length === 0)
        ? <Paper className={classes.paper}>
            <div>No Data on Profit margins</div>
        </Paper>
        : pieChart
}


