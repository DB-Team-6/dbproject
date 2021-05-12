// import React, { useState, useEffect } from 'react';
// //mport { Bar } from 'react-chartjs-2';
// import styles from './Chart.module.css';
// import { Bar } from "@nivo/bar";

// export default function BarChart({ monthlyProfit }){

//     if (!monthlyProfit) return null;

//     const barChart = (
//         <Bar
//             width={1000}
//             height={500}
//             margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
//             data={monthlyProfit}
//             indexBy="month"
//             keys={["profit"]}
//             labelTextColor="inherit:darker(1.4)"
//             enableGridX={true}
//             colors={({ id, data }) => data[`${id}Color`]}
//             theme={{
//                 axis: {
//                     ticks: {
//                         line: {
//                             stroke: "green"
//                         },
//                         text: {
//                             fill: "red"
//                         }
//                     }
//                 },
//                 grid: {
//                     line: {
//                         stroke: "pink",
//                         strokeWidth: 2,
//                         strokeDasharray: "4 4"
//                     }
//                 }
//             }}
//         />
//     )
//     // const barChart = (
//     //     <Bar
//     //         data={{
//     //             labels: monthlyProfit.map(({ month }) => month),
//     //             datasets: [{
//     //                 label: "Profit",
//     //                 backgroundColor: [
//     //                     'rgba(0, 0, 255, 0.7)',
//     //                     'rgba(0, 255, 255, 0.8)',
//     //                     'rgba(0, 255, 0, 0.9)',
//     //                     'rgba(200, 0, 255, 0.7)',
//     //                     'rgba(255, 60, 255, 0.8)',
//     //                     'rgba(0, 70, 0, 0.5)',
//     //                     'rgba(0, 25, 0, 1)',
//     //                     'rgba(0, 0, 255, 0.7)',
//     //                     'rgba(60, 0, 255, 0.9)',
//     //                     'rgba(100, 25, 0, 0.6)',
//     //                     'rgba(100, 0, 255, 0.7)',
//     //                     'rgba(90, 80, 255, 0.8)',

//     //                 ],
//     //                 data: monthlyProfit.map(({ profit }) => profit)
//     //             }]
//     //         }}
//     //         options={{
//     //             legend: { display: false },
//     //             title: { display: true, text: "Monthly profit so far in 2021" }

//     //         }}
//     //     />
//     // )


//     return (
//         <div className={styles.container}>
//             {monthlyProfit.length === 0
//                 ? <div>No Data found</div>
//                 : barChart
//             }
//         </div>
//     )
// }
