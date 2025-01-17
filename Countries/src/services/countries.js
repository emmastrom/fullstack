import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}

const getWeather = ( latitude, longitude ) => {
    const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
    return request.then(response => response.data)
}

export default { getAll, getWeather }