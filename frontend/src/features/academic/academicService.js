import axios from 'axios'

const API_URL = '/api/academic/'

//Create new academic
const createAcademic = async (academicData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, academicData, config)

    return response.data
}

//Get user academic
const getAcademic = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete user academic
const deleteAcademic = async (academicId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + academicId, config)

    return response.data
}

const academicService = {
    createAcademic,
    getAcademic,
    deleteAcademic
}

export default academicService