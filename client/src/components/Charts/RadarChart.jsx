import React from 'react'
import { ResponsiveRadar } from "@nivo/radar";
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

export default function RadarChart({ data }) {
    const classes = useStyles();
    const LabelComponent = ({ id, anchor }) => (
        // <g transform={`translate(${anchor === 'end' ? -30 : anchor === 'middle' ? -20 : -15}, -5)`}></g>
        <g transform={`translate(${anchor === 'end' ? -10 : anchor === 'middle' ? -20 : -30}, 7)`}>
            <text>{id}</text>
            <text
                y={18}
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    fill: '#3a9896',
                }}
            >
                {/* +{30}% */}
            </text>
        </g>
    )
    
    const radarChart = (
        (data)
        ? (<Paper className={classes.paper}>
                <div>Employee Performance</div>
                <div style={{ height: 390, width: 550 }}>
                    <ResponsiveRadar
                        data={data}
                        keys={['sales']}
                        indexBy="firstName"
                        maxValue="auto"
                        margin={{ top: 80, right: 50, bottom: 49, left: 55 }}
                        curve="linearClosed"
                        borderWidth={2}
                        borderColor={{ from: 'color' }}
                        gridLevels={5}
                        gridShape="circular"
                        gridLabelOffset={36}
                        enableDots={true}
                        dotSize={10}
                        dotColor={{ theme: 'background' }}
                        dotBorderWidth={2}
                        dotBorderColor={{ from: 'color' }}
                        enableDotLabel={true}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors={{ scheme: 'nivo' }}
                        fillOpacity={0.25}
                        blendMode="multiply"
                        animate={true}
                        motionConfig="wobbly"
                        isInteractive={true}
                        gridLabel={LabelComponent}
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'column',
                                translateX: -50,
                                translateY: -40,
                                itemWidth: 80,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </Paper>
            ) : null
    )

    return (data) && (data.length === 0)
        ? <Paper className={classes.paper}>
            <div>No Data on Employee Performance</div>
        </Paper>
        : radarChart
}


