import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
    console.log('register authService - ' + userData.email)
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Update user profile
const update = async (id, userData, token) => {
    console.log('update authService userData - ')
    console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + id, userData, config)
    console.log('update authService response.data')
    console.log(response.data)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//get user
const getMe = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
//    const response = await axios.get('http://localhost:5000' + API_URL + 'me', config)
    const response = await axios.get(API_URL + 'me', config)
    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    getMe,
    update
}

export default authService