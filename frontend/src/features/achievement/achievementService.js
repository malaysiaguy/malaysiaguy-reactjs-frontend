import axios from 'axios'

const API_URL = '/api/achievement/'

//Create new achievement
const createAchievement = async (achievementData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, achievementData, config)

    return response.data
}

//Get user achievement
const getAchievement = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    console.log('achievementService response - ' + response.data)
    return response.data
}

//Delete user achievement
const deleteAchievement = async (achievementId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + achievementId, config)

    return response.data
}

const achievementService = {
    createAchievement,
    getAchievement,
    deleteAchievement
}

export default achievementService