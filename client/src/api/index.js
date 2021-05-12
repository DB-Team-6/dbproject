import axios from 'axios';

//const localUrl = 'http://localhost:3000'
const baseUrl = 'https://db-team-6-test.herokuapp.com'

// export const fetchMonthlyProfit = () => {
//     try {
//         const data = axios.get(`${localUrl}/monthlySales.json`)
//             .then(response => {
//                 //console.log("ingrdients->!", response.data)
//                 return response.data;
//             })
//         return data
//     } catch (error) {
//         console.log("not passed!", error)
//     }
// }


export const fetchWeeklyData = (range) => {
    const request = {
        "startdate": range[0],
        "enddate": range[1]
    }
    try {
        const url = `${baseUrl}/api/estimate`;
        const data = axios.post(url, request)
            .then(response => response.data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchPizzaProfit = (range) => {
    const request = {
        "startdate": range[0],
        "enddate": range[1]
    }
    try {
        //const local = `${localUrl}/profit.json`;
        const url = `${baseUrl}/api/profit`;
        const data = axios.post(url, request)
            .then(response => {
                return response.data.map((obj, i) => ({
                    i:i,
                    id: obj.pizzaName,
                    label: obj.pizzaName,
                    value: obj.profit
                }))
            })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchEmployeeSales = (range) => {
    const request = {
        "startdate": range[0],
        "enddate": range[1]
    }
    try {
        //const local = `${localUrl}/employeeSales.json`;
        const url = `${baseUrl}/api/empsales`;
        const data = axios.post(url, request)
            .then(response => {
                return response.data})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const loginToApp = (password) => {
    const request = {
        "accesscode": password
    }
    try {
        //const local = `${url}/login.json`;
        const url = `${baseUrl}/api/login/`
        const data = axios.post(url, request)
            .then(response => {
                return response.data;
            })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const Logout = () => {
    try {
        //const local = `${localUrl}/logout.json`;
        const url = `${baseUrl}/api/logout/`
        const data = axios.get(url)
            .then(response => {
                return response.data;
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