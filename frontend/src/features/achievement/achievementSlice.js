import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import achievementService from './achievementService'

const initialState = {
    achievements: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new achievement
export const createAchievement = createAsyncThunk('achievement/create',
    async (achievementData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await achievementService.createAchievement(achievementData, token)
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

//Delete user achievement
export const deleteAchievement = createAsyncThunk('achievement/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await achievementService.deleteAchievement(id, token)
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

//Get user achievement
export const getAchievement = createAsyncThunk('achievement/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await achievementService.getAchievement(token)
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

export const achievementSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAchievement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAchievement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.achievements.push(action.payload)
            })
            .addCase(createAchievement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAchievement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAchievement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.achievements = action.payload
            })
            .addCase(getAchievement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAchievement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAchievement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.achievements = state.achievements.filter((achievement) => achievement._id !==
                action.payload.id)
            })
            .addCase(deleteAchievement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = achievementSlice.actions
export default achievementSlice.reducer