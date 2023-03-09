import axios from 'axios'

const API_URL = '/api/experienceSummary/'

//Create new experienceSummary
const createExperienceSummary = async (experienceSummaryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, experienceSummaryData, config)

    return response.data
}

//Get user experienceSummary
const getExperienceSummary = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
//    console.log('expSummService resp - ' + response.data)
    return response.data
}

//Delete user experienceSummary
const deleteExperienceSummary = async (experienceSummaryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + experienceSummaryId, config)

    return response.data
}

const experienceSummaryService = {
    createExperienceSummary,
    getExperienceSummary,
    deleteExperienceSummary
}

export default experienceSummaryService