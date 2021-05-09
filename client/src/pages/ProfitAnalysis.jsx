import { BarChart } from '../components';
import { Paper } from '@material-ui/core';
import styles from '../App.module.css';

export default function ProfitAnalysis({ monthlyProfit }) {
   return (
      <Paper square className={styles.container} >
         <BarChart monthlyProfit={monthlyProfit} />
      </Paper>
   )
}