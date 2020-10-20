import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 1000,
        content: "This note is not saved to server",
        important: true,
    }
    /*
    return request.then(response => {
        return response.data
    })*/
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObjet => {
    const request = axios.post(baseUrl, newObjet)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObjet) => {
    const request = axios.put(`${baseUrl}/${id}`, newObjet)    
    return request.then(response => {
        return response.data
    })
}

export default { getAll, create, update }