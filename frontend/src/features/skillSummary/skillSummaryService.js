import axios from 'axios'

const API_URL = '/api/skillSummary/'

//Create new skillSummary
const createSkillSummary = async (skillSummaryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, skillSummaryData, config)

//    console.log('skillService response - ' + response.data)
    return response.data
}

//Get user skillSummary
const getSkillSummary = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

//    console.log('getskillService response - ' + response.data)
    return response.data
}

//Delete user skillSummary
const deleteSkillSummary = async (skillSummaryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + skillSummaryId, config)

    return response.data
}

const skillSummaryService = {
    createSkillSummary,
    getSkillSummary,
    deleteSkillSummary
}

export default skillSummaryService