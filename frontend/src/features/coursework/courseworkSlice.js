import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseworkService from './courseworkService'

const initialState = {
    courseworks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new Coursework
export const createCoursework = createAsyncThunk('coursework/create',
    async (courseworkData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await courseworkService.createCoursework(courseworkData, token)
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

//Delete user Coursework
export const deleteCoursework = createAsyncThunk('coursework/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await courseworkService.deleteCoursework(id, token)
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

//Get user Coursework
export const getCoursework = createAsyncThunk('coursework/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await courseworkService.getCoursework(token)
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

export const courseworkSlice = createSlice({
    name: 'courseworks',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCoursework.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCoursework.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courseworks.push(action.payload)
            })
            .addCase(createCoursework.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCoursework.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoursework.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courseworks = action.payload
            })
            .addCase(getCoursework.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteCoursework.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCoursework.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courseworks = state.courseworks.filter((coursework) => coursework._id !==
                action.payload.id)
            })
            .addCase(deleteCoursework.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = courseworkSlice.actions
export default courseworkSlice.reducer