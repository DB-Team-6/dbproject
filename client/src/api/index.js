import axios from 'axios';

const localUrl = 'http://localhost:3000'
const baseUrl = 'https://db-team-6-test.herokuapp.com/api'



export const fetchMonthlyProfit = () => {
    try {
        const data = axios.get(`${localUrl}/monthlySales.json`)
            .then(response => {
                //console.log("ingrdients->!", response.data)
                return response.data;
            })
        return data
    } catch (error) {
        console.log("not passed!", error)
    }
}

export const fetchWeeklyData = (month, week) => {
    try {
        const request = `${localUrl}/${month}/${week}.json`;
        const data = axios.get(request)
            .then(response => {
                return response.data;
            })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchWeeklyData2 = (range) => {
    const request = {
        "startdate": range[0],
        "enddate": range[1]
    }
    try {
        const url = `${baseUrl}/estimate/`;
        const data = axios.post(url, request)
            .then(response => {
                return response.data;
            })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const loginToApp = (password) => {
    const request = { 
        "password": password 
    }
    try {
        const url = `${localUrl}/login.json`;
        const data = axios.get(url, request)
            .then(response => {
                if ((response.data.password) === password){
                    console.log((response))
                    return "Access Granted";
                }
                else{
                    return "Access Denied"
                }
            })
        return data
    } catch (error) {
        console.log(error)
    }
}










// export const fetchMonths = () => {
//     try {
//         const data = axios.get(`${localUrl}/months.json`)
//             .then(response => {
//                 //console.log("months->",response.data)
//                 return response.data;
//             })
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

/**
 * const nested = response.data.ingredients.map((weeklyData) => {
 *      item: response.data.ingredients[0].item,
        consumed: response.data.ingredients[0].consumed,
        supplied: response.data.ingredients[0].supplied,
        expected_mean: response.data.ingredients[0].expected_mean
 *
 *  })
 *
 * const modifiedData = {
        month: response.data.month,
        week: response.data.week,
        item: response.data.ingredients.item,
        consumed: response.data.ingredients.consumed,
        supplied: response.data.ingredients.supplied,
        expected_mean: response.data.ingredients.expected_mean
    }
    console.log(modifiedData)
    return modifiedData
 */