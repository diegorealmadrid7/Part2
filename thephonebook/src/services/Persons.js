import axios from 'axios'

const baseURl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURl)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseURl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
  }

const deletePerson = id => {
    const request = axios.delete(`${baseURl}/${id}`)
    return request.then(response => {
        return response.data
    })
}

export default { getAll, create, update, deletePerson }