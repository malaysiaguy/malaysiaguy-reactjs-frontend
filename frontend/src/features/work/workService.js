import axios from 'axios'

const API_URL = '/api/work/'

//Create new work
const createWork = async (workData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, workData, config)

    return response.data
}

//Get user work
const getWorks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete user work
const deleteWork = async (workId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + workId, config)

    return response.data
}

const workService = {
    createWork,
    getWorks,
    deleteWork
}

export default workService