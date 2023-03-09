import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import skillSummaryService from './skillSummaryService'

const initialState = {
    skillSummaries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new skillSummary
export const createSkillSummary = createAsyncThunk('skillSummary/create',
    async (skillSummaryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await skillSummaryService.createSkillSummary(skillSummaryData, token)
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

//Delete user skillSummary
export const deleteSkillSummary = createAsyncThunk('skillSummary/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await skillSummaryService.deleteSkillSummary(id, token)
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

//Get user skillSummary
export const getSkillSummary = createAsyncThunk('skillSummary/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
//            console.log('getSkillSummary token - ' + token)
            return await skillSummaryService.getSkillSummary(token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
//            console.log('getSkillSummary slice -' + message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const skillSummarySlice = createSlice({
    name: 'skillSummaries',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSkillSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSkillSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skillSummaries.push(action.payload)
            })
            .addCase(createSkillSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSkillSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSkillSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skillSummaries = action.payload
            })
            .addCase(getSkillSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteSkillSummary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSkillSummary.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.skillSummaries = state.skillSummaries.filter((skillSummary) => skillSummary._id !==
                action.payload.id)
            })
            .addCase(deleteSkillSummary.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = skillSummarySlice.actions
export default skillSummarySlice.reducer