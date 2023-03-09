import axios from 'axios'

const API_URL = '/api/activity/'

//Create new activity
const createActivity = async (activityData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, activityData, config)

    return response.data
}

//Get user activity
const getActivity = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
//    console.log('activityService response - ' + response.data)
    return response.data
}

//Delete user activity
const deleteActivity = async (activityId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + activityId, config)

    return response.data
}

const activityService = {
    createActivity,
    getActivity,
    deleteActivity
}

export default activityService