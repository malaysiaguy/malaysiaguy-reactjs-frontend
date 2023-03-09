import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
//console.log('authSlice localStorage - ' + localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    id: null,
    token: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Register user
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            console.log('register authSlice - ' + user)
            return await authService.register(user)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Update user profile
export const update = createAsyncThunk('auth/update',
    async (user, thunkAPI) => {
        console.log('update authSlice id - ' + user._id)
        console.log('update authSlice user - ' + user.address)
        try {
            const token = thunkAPI.getState().users.user.token
            console.log('update authSlice token - ' + token)
            return await authService.update(thunkAPI.getState().users.user._id, user, token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get user Profile
export const me = createAsyncThunk('auth/me', async (_,
    thunkAPI) => {
        try {
            console.log('inside authSlice getUserProfile')
            const token = thunkAPI.getState().users.user.token
            return await authService.getMe(token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'users',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) { state.isLoggedIn = true},
        logout(state) { state.isLoggedIn = false},
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isSuccess = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                console.log('inside update-fulfilled authSlice')
//                const updatedUser = state.user.map((updateUser) => updateUser._id === action.payload._id ? action.payload : updateUser)
                console.log('update-fulfilled authSlice action.payload - ' + action.payload.country)
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(me.pending, (state) => {
                state.isLoading = true
            })
            .addCase(me.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                console.log('action.payload - ')
                console.log(action.payload)
            })
            .addCase(me.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer