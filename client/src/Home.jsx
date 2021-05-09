import React from 'react';
import './App.css';
import { fetchMonthlyProfit, fetchWeeklyData, fetchWeeklyData2 } from './api';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { LineChart, MonthPicker } from './components';
import ProfitAnalysis from './pages/ProfitAnalysis';
import WeeklyAnalysis from './pages/WeeklyAnalysis';
import styles from './App.module.css';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { format, isValid, parseISO } from 'date-fns';

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
    }

    async componentDidMount() {
        const fetchedData = await fetchMonthlyProfit();
        this.setState({ monthlyProfit: fetchedData })
    }

    handleMonthChange = async ({ month, week }) => {
        //const { weeklyData, enabledItemsObject } = this.state

        this.setState({ month: month, week: week, })
        if (!month) {
            month = this.state.month
        }
        if (!week) {
            week = this.state.week
        }
        if (month && week) {
            const fetchedData = await fetchWeeklyData(month, week);
            //this.setState({ weeklyData: fetchedData, month: month, week: week })
        
            let enabledItemsObject = {};
            fetchedData.map((d, i) => {
                if ([0, 1, 2].includes(i)) {
                    enabledItemsObject[d.ingredient] = true
                }
                else {
                    enabledItemsObject[d.ingredient] = false
                }
                return 0
            })

            this.setState({
                weeklyData: fetchedData, month: month, week: week,
                enabledItemsObject: enabledItemsObject,
                chartedList: fetchedData.filter(d => enabledItemsObject[d.ingredient] === true)
            })
        }
    }

    handleItemCheck = (event) => {
        console.log("here", this.state.weeklyData.filter(d => this.state.enabledItemsObject[d.ingredient] === true))
        const enabledItemsObject = { ...this.state.enabledItemsObject, [event.target.name]: event.target.checked }

        this.setState({
            enabledItemsObject: enabledItemsObject,
            chartedList: this.state.weeklyData.filter(d => enabledItemsObject[d.ingredient] === true)
        });

    }

    handleDateChange = (newValue) => {
        console.log("new Value sent to api", newValue)
        if (newValue[0] && newValue[1]) {
            console.log(newValue.map(value => format(new Date(value), "yyyy-MM-dd")))
        }

        this.setState({
            dateSelection: newValue,
        })
    }

    handleSubmit = async(event) =>{
        event.preventDefault();

        const { dateSelection } = this.state;

        if (dateSelection) {
            const fetchedData = await fetchWeeklyData2(dateSelection.map(value => format(new Date(value), "yyyy-MM-dd")));
            console.log("fetchedData", fetchedData)
            let enabledItemsObject = {};
            fetchedData.map((d, i) => {
                if ([0, 1, 2].includes(i)) {
                    enabledItemsObject[d.ingredient] = true
                }
                else {
                    enabledItemsObject[d.ingredient] = false
                }
                return 0
            })

            this.setState({
                weeklyData: fetchedData,
                enabledItemsObject: enabledItemsObject,
                chartedList: fetchedData.filter(d => enabledItemsObject[d.ingredient] === true)
            })
            
        }

        
    }

    handleTabChange = (e, newValue) => this.setState({ tabSelected: newValue })
    render() {

        const { tabSelected, monthlyProfit } = this.state
        return (
            <div>
                <Paper square>
                    <Tabs
                        value={tabSelected}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Profit Analysis" {...a11yProps(0)} />
                        <Tab label="Weekly Analysis" {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                <TabPanel value={tabSelected} index={0}>
                    <ProfitAnalysis monthlyProfit={monthlyProfit} />
                </TabPanel>
                <TabPanel value={tabSelected} index={1}>
                    <WeeklyAnalysis handleMonthChange={this.handleMonthChange}
                        handleItemCheck={this.handleItemCheck}
                        handleDateChange={this.handleDateChange}
                        handleSubmit={this.handleSubmit}
                        {...this.state} />
                </TabPanel>
            </div>
        )
    }
}

export default Home;

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

