import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import experienceSummaryService from './experienceSummaryService'

const initialState = {
    experienceSummaries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new experienceSummary
export const createExperienceSummary = createAsyncThunk('experienceSummary/create',
    async (experienceSummaryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await experienceSummaryService.createExperienceSummary(experienceSummaryData, token)
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

//Delete user experienceSummary
export const deleteExperienceSummary = createAsyncThunk('experienceSummary/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await experienceSummaryService.deleteExperienceSummary(id, token)
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

//Get user experienceSummary
export const getExperienceSummary = createAsyncThunk('experienceSummary/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
//            console.log('getExperienceSummary token -' + token)
            return await experienceSummaryService.getExperienceSummary(token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
//            console.log('getExperienceSummary slice -' + message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const experienceSummarySlice = createSlice({
    name: 'experienceSummaries',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createExperienceSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createExperienceSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.experienceSummaries.push(action.payload)
            })
            .addCase(createExperienceSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getExperienceSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExperienceSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.experienceSummaries = action.payload
            })
            .addCase(getExperienceSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteExperienceSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteExperienceSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.experienceSummaries = state.experienceSummaries.filter((experienceSummary) => experienceSummary._id !==
                action.payload.id)
            })
            .addCase(deleteExperienceSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = experienceSummarySlice.actions
export default experienceSummarySlice.reducer