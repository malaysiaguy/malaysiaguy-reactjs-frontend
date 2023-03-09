import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import activityService from './activityService'

const initialState = {
    activities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}


//Create new Activity
export const createActivity = createAsyncThunk('activity/create',
    async (activityData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await activityService.createActivity(activityData, token)
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

//Delete user Activity
export const deleteActivity = createAsyncThunk('activity/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await activityService.deleteActivity(id, token)
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

//Get user Activity
export const getActivity = createAsyncThunk('activity/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
//            console.log('activitySlice token - ' + token)
            return await activityService.getActivity(token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
//            console.log('activitySlice message - ' + message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const activitySlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities.push(action.payload)
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities = action.payload
            })
            .addCase(getActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activities = state.activities.filter((activity) => activity._id !==
                action.payload.id)
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = activitySlice.actions
export default activitySlice.reducer