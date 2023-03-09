import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import academicService from './academicService'

const initialState = {
    academics: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new Academic
export const createAcademic = createAsyncThunk('academic/create',
    async (academicData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await academicService.createAcademic(academicData, token)
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

//Delete user Academic
export const deleteAcademic = createAsyncThunk('academic/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await academicService.deleteAcademic(id, token)
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

//Get user Academic
export const getAcademic = createAsyncThunk('academic/getAll', async (_,
    thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user.token
            return await academicService.getAcademic(token)
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

export const academicSlice = createSlice({
    name: 'academics',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAcademic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createAcademic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.academics.push(action.payload)
            })
            .addCase(createAcademic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAcademic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAcademic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.academics = action.payload
            })
            .addCase(getAcademic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAcademic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteAcademic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.academics = state.academics.filter((academic) => academic._id !==
                action.payload.id)
            })
            .addCase(deleteAcademic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = academicSlice.actions
export default academicSlice.reducer