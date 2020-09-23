import axios from 'axios'

const baseUrl = 'http://api.weatherstack.com/current?access_key=77b3da13009e5f6e902350d4a8c2eec6'
/*const key = api.env.REACT_APP_API_KEY*/

const getWeather = async capital => {
    const response = await axios.get(`${baseUrl}&query=${capital}`)
    console.log(response)
    return response.data.current
}

export default getWeather