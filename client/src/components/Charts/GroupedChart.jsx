import React, { useState, useEffect } from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { withKnobs, select } from '@storybook/addon-knobs'
// import { generateCountriesData, sets } from '@nivo/generators'
// import range from 'lodash/range'
// import random from 'lodash/random'
// import { useTheme } from '@nivo/core'
import { Bar } from "@nivo/bar";
// import { Bar } from '../src'
import styles from './Chart.module.css';


export default function GroupedChart({ chartedList }) {
    const keys = ['consumed', 'supplied', 'estimate']
    const commonProps = {
        width: 900,
        height: 500,
        margin: { top: 60, right: 80, bottom: 60, left: 80 },
        data: chartedList,
        indexBy: 'ingredient',
        keys,
        padding: 0.2,
        labelTextColor: 'inherit:darker(1.4)',
        labelSkipWidth: 16,
        labelSkipHeight: 16,
    }

    console.log(chartedList)
    const groupedChart = (
        (chartedList)
            ? (
                <Bar
                    width={1000}
                    height={500}
                    margin={{ top: 10, right: 80, bottom: 60, left: 80 }}
                    data= {chartedList}
                    indexBy="ingredient"
                    keys={keys}
                    labelTextColor="inherit:darker(1.4)"
                    enableGridX={true}
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

            ) : null
    )

    return (
        <div className={styles.container}>
            {(chartedList) && (chartedList.length === 0)
                ? <div>No Data found</div>
                : groupedChart
            }
        </div>
    )
}

