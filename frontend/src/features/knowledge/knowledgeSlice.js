import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import knowledgeService from './knowledgeService'

const initialState = {
    knowledges: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new Knowledge
export const createKnowledge = createAsyncThunk('knowledge/create',
    async (knowledgeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await knowledgeService.createKnowledge(knowledgeData, token)
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

//Delete user Knowledge
export const deleteKnowledge = createAsyncThunk('knowledge/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await knowledgeService.deleteKnowledge(id, token)
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

//Get user Knowledge
export const getKnowledge = createAsyncThunk('knowledge/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await knowledgeService.getKnowledge(token)
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

export const knowledgeSlice = createSlice({
    name: 'knowledges',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createKnowledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createKnowledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.knowledges.push(action.payload)
            })
            .addCase(createKnowledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getKnowledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getKnowledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.knowledges = action.payload
            })
            .addCase(getKnowledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteKnowledge.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteKnowledge.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.knowledges = state.knowledges.filter((knowledge) => knowledge._id !==
                action.payload.id)
            })
            .addCase(deleteKnowledge.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = knowledgeSlice.actions
export default knowledgeSlice.reducer