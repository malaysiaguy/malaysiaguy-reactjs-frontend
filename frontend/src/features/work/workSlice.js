import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workService from './workService'

const initialState = {
    works: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new work
export const createWork = createAsyncThunk('work/create',
    async (workData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await workService.createWork(workData, token)
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

//Delete user work
export const deleteWork = createAsyncThunk('work/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await workService.deleteWork(id, token)
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

//Get user work
export const getWorks = createAsyncThunk('work/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await workService.getWorks(token)
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

export const workSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWork.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createWork.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.works.push(action.payload)
            })
            .addCase(createWork.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getWorks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWorks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.works = action.payload
            })
            .addCase(getWorks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteWork.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteWork.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.works = state.works.filter((work) => work._id !==
                action.payload.id)
            })
            .addCase(deleteWork.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = workSlice.actions
export default workSlice.reducer