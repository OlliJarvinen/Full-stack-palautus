import axios from 'axios'
const countriesUrl = https://studies.cs.helsinki.fi/restcountries/all
const countryUrl = https://studies.cs.helsinki.fi/restcountries/name

const getAll = () => {
    return axios.get(countriesUrl)
}

export {
    getAll
}