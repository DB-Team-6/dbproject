// import React, { useState, useEffect } from 'react';
// import { Line, Bar } from 'react-chartjs-2';
// import styles from './Chart.module.css';

// const Chart = ({ weeklyData, month, week, monthlyProfit }) => {
//     const barChart = (
//         (monthlyProfit[0])
//         ?   (
//             <Bar
//             data = {{
//                 labels: monthlyProfit.map(({ month }) => month ),
//                 datasets: [{
//                     label: "Profit",
//                     backgroundColor: [
//                         'rgba(0, 0, 255, 0.7)',
//                         'rgba(0, 255, 255, 0.8)',
//                         'rgba(0, 255, 0, 0.9)',
//                         'rgba(200, 0, 255, 0.7)',
//                         'rgba(255, 60, 255, 0.8)',
//                         'rgba(0, 70, 0, 0.5)',
//                         'rgba(0, 25, 0, 1)',
//                         'rgba(0, 0, 255, 0.7)',
//                         'rgba(60, 0, 255, 0.9)',
//                         'rgba(100, 25, 0, 0.6)',
//                         'rgba(100, 0, 255, 0.7)',
//                         'rgba(90, 80, 255, 0.8)',

//                     ],
//                     data: monthlyProfit.map(({ profit }) => profit )
//                 }]
//             }}
//             options = {{
//                 legend: { display: false },
//                 title: { display: true, text: "Monthly profit so far in 2021"}

//             }}
//             />
//         ) : null 
//     )

//     const lineChart = (
//         (weeklyData[0])
//             ?   (
//                 <Line
//                 data={{
//                     labels: weeklyData.map(({ ingredient }) => ingredient),
//                     datasets: [{
//                         data: weeklyData.map(({ consumed }) => consumed),
//                         label: 'Consumed',
//                         borderColor: '#3333ff',
//                         fill: true
//                     }, 
//                     {
//                         data: weeklyData.map(({ supplied }) => supplied),
//                         label: 'Supplies',
//                         borderColor: 'rgba(255, 0, 0, 0.5)',
//                         fill: true
//                     },
//                     {
//                         data: weeklyData.map(({ estimate }) => estimate),
//                         label: 'Expected Mean',
//                         borderColor: 'red',
//                         backgroundColor: 'rgba(255, 599, 0, 0.5)',
//                         fill: true
//                     }],
//                 }}
//             />) : null
//     );

//     return (
//         <div className={styles.container}>
//             {month ? lineChart : barChart}
//         </div>
//     )
// }

// export default Chart;