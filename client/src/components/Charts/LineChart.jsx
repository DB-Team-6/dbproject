// import React from 'react';
// //import { fetchWeeklyData, fetchMonthlyProfit } from '../../api';
// import { Line } from 'react-chartjs-2';
// import styles from './Chart.module.css';

// export default function LineChart({ weeklyData }){

    
    
//     const lineChart = (
//         (weeklyData[0])
//             ? (
//                 <Line
//                     data={{
//                         labels: weeklyData.map(({ ingredient }) => ingredient),
//                         datasets: [{
//                             data: weeklyData.map(({ consumed }) => consumed),
//                             label: 'Consumed',
//                             borderColor: '#3333ff',
//                             fill: true
//                         },
//                         {
//                             data: weeklyData.map(({ supplied }) => supplied),
//                             label: 'Supplies',
//                             borderColor: 'rgba(255, 0, 0, 0.5)',
//                             fill: true
//                         },
//                         {
//                             data: weeklyData.map(({ estimate }) => estimate),
//                             label: 'Expected Mean',
//                             borderColor: 'red',
//                             backgroundColor: 'rgba(255, 599, 0, 0.5)',
//                             fill: true
//                         }],
//                     }}
//                 />) : null
//     );

//     return (
//         <div className={styles.container}>
//             {weeklyData.length === 0
//                 ? <div>No Data found</div>
//                 : lineChart
//             }
//         </div>
//     )
// }