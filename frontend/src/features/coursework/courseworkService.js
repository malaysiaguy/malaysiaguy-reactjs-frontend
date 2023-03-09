import axios from 'axios'

const API_URL = '/api/coursework/'

//Create new coursework
const createCoursework = async (courseworkData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, courseworkData, config)

    return response.data
}

//Get user coursework
const getCoursework = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete user coursework
const deleteCoursework = async (courseworkId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + courseworkId, config)

    return response.data
}

const courseworkService = {
    createCoursework,
    getCoursework,
    deleteCoursework
}

export default courseworkService