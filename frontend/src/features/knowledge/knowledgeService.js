import axios from 'axios'

const API_URL = '/api/knowledge/'

//Create new knowledge
const createKnowledge = async (knowledgeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, knowledgeData, config)

    return response.data
}

//Get user knowledge
const getKnowledge = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete user knowledge
const deleteKnowledge = async (knowledgeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + knowledgeId, config)

    return response.data
}

const knowledgeService = {
    createKnowledge,
    getKnowledge,
    deleteKnowledge
}

export default knowledgeService