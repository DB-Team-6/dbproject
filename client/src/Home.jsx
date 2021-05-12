import React from 'react';
import './App.css';
import { fetchEmployeeSales, fetchPizzaProfit, fetchWeeklyData } from './api';
import { Container, Grow } from '@material-ui/core';
import WeeklyAnalysis from './pages/WeeklyAnalysis';
import { format } from 'date-fns';

class Home extends React.Component {
    state = {
        week: undefined,
        month: undefined,
        weeklyData: undefined,
        monthlyProfit: [],
        tabSelected: 1,
        enabledItemsObject: {},
        chartedList: undefined,
        dateSelection: [null, null],
        employeeSalesData: undefined,
        pizzaProfitData: undefined
    }

    // async componentDidMount() {

    // }

    handleItemCheck = (event) => {
        const enabledItemsObject = { ...this.state.enabledItemsObject, [event.target.name]: event.target.checked }
        this.setState({
            enabledItemsObject: enabledItemsObject,
            chartedList: this.state.weeklyData.filter(d => enabledItemsObject[d.ingredient] === true)
        });
    }
    
    handleDateChange = (newValue) => {
        this.setState({
            dateSelection: newValue,
        })
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        const { dateSelection } = this.state;
        const dateRange = dateSelection.map(value => format(new Date(value), "yyyy-MM-dd"));
        if (dateSelection) {
            const fetchEmployeeSalesData = await fetchEmployeeSales(dateRange);
            const fetchPizzaProfitData = await fetchPizzaProfit(dateRange);
            const fetchedData = await fetchWeeklyData(dateRange);
            const sortedfetchedData = fetchedData.sort((a, b) => (a.ingredient > b.ingredient) ? 1 : -1)
            let enabledItemsObject = {};
            sortedfetchedData.map((d, i) => {
                enabledItemsObject[d.ingredient] = i < 6
                // if ([...Array(6)].map((_, i) => i).includes(i)) {
                //     enabledItemsObject[d.ingredient] = true
                // }
                // else {
                //     enabledItemsObject[d.ingredient] = false
                // }
                return 0
            })
            
            this.setState({
                weeklyData: sortedfetchedData,
                enabledItemsObject: enabledItemsObject,
                chartedList: sortedfetchedData.filter(d => enabledItemsObject[d.ingredient] === true),
                employeeSalesData: fetchEmployeeSalesData,
                pizzaProfitData: fetchPizzaProfitData
            })
        }
    }

    render() {
        return (
            <Grow in>
                <Container >
                    <WeeklyAnalysis handleMonthChange={this.handleMonthChange}
                        handleItemCheck={this.handleItemCheck}
                        handleDateChange={this.handleDateChange}
                        handleSubmit={this.handleSubmit}
                        {...this.state} />
                </Container>
            </Grow>
        )
    }
}
export default Home;












// handleMonthChange = async ({ month, week }) => {
//     //const { weeklyData, enabledItemsObject } = this.state

//     this.setState({ month: month, week: week, })
//     if (!month) {
//         month = this.state.month
//     }
//     if (!week) {
//         week = this.state.week
//     }
//     if (month && week) {
//         const fetchedData = await fetchWeeklyData(month, week);
//         //this.setState({ weeklyData: fetchedData, month: month, week: week })

//         let enabledItemsObject = {};
//         fetchedData.map((d, i) => {
//             if ([0, 1, 2].includes(i)) {
//                 enabledItemsObject[d.ingredient] = true
//             }
//             else {
//                 enabledItemsObject[d.ingredient] = false
//             }
//             return 0
//         })

//         this.setState({
//             weeklyData: fetchedData, month: month, week: week,
//             enabledItemsObject: enabledItemsObject,
//             chartedList: fetchedData.filter(d => enabledItemsObject[d.ingredient] === true)
//         })
//     }
// }

//     handleTabChange = (e, newValue) => this.setState({ tabSelected: newValue })
//     render() {

//         const { tabSelected, monthlyProfit } = this.state
//         return (
//             <div>
//                 <Paper square>
//                     <Tabs
//                         value={tabSelected}
//                         indicatorColor="primary"
//                         textColor="primary"
//                         onChange={this.handleTabChange}
//                         aria-label="disabled tabs example"
//                     >
//                         <Tab label="Profit Analysis" {...a11yProps(0)} />
//                         <Tab label="Weekly Analysis" {...a11yProps(1)} />
//                     </Tabs>
//                 </Paper>
//                 <TabPanel value={tabSelected} index={0}>
//                     <ProfitAnalysis monthlyProfit={monthlyProfit} />
//                 </TabPanel>
//                 <TabPanel value={tabSelected} index={1}>
//                     <WeeklyAnalysis handleMonthChange={this.handleMonthChange}
//                         handleItemCheck={this.handleItemCheck}
//                         handleDateChange={this.handleDateChange}
//                         handleSubmit={this.handleSubmit}
//                         {...this.state} />
//                 </TabPanel>
//             </div>
//         )
//     }
// }

// export default Home;

// function a11yProps(index) {
//     return {
//         id: `scrollable-prevent-tab-${index}`,
//         'aria-controls': `scrollable-prevent-tabpanel-${index}`,
//     };
// }

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-prevent-tabpanel-${index}`}
//             aria-labelledby={`scrollable-prevent-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

