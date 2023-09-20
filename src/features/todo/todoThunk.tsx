import { createAsyncThunk } from "@reduxjs/toolkit"


import { api } from "../../services/api/api"
import { TodoGet, ReturnType } from "./todoInterface"


export const search = createAsyncThunk(
    "SEARCH",
    async (name: string, { rejectWithValue, getState }) => {

        try {

            // '/tarefa?sort=-createdAt'+search
            const search = name ? `?name=${name}` : ''
            const response = await api.get('tarefa/' + search)
            const responseData: ReturnType<TodoGet[]> = { data: response.data }
            return responseData
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const add = createAsyncThunk(
    "ADD",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await api.post("tarefa/", {
                name: name,
                done: true,
                delete: false
            })

            const returnData: ReturnType<TodoGet> = {
                data: response.data,

            };


            return returnData;

        } catch (err) {
            return rejectWithValue(err)
        }
    }
)





export const markAsDone = createAsyncThunk(
    "MARK_AS_DONE",
    async (todo: TodoGet, { rejectWithValue }) => {
        try {
            const response = await api.patch("tarefa/" + todo.id + "/", { done: false })
            const returnData: ReturnType<TodoGet> = {
                data: response.data,

            };
            return returnData

        } catch (err) {
            return rejectWithValue(err)
        }

    }

)


export const markAsPending = createAsyncThunk(
    "MARK_AS_PENDING",
    async (todo: TodoGet, { rejectWithValue }) => {
        try {
            const response = await api.patch('tarefa/' + todo.id + "/", { done: true })
            const returnData: ReturnType<TodoGet> = {
                data: response.data,

            };
            return returnData
        } catch (err) {
            return rejectWithValue(err)
        }

    }

)


export const remove = createAsyncThunk(
    "REMOVED",
    async (todo: TodoGet, { rejectWithValue }) => {
        try {
            const response = await api.delete('tarefa/' + todo.id + "/")
            const returnData: ReturnType<any> = {
                data: response.data,

            };
            return returnData

        } catch (err) {
            return rejectWithValue(err)
        }

    }
)

export const clear = () => {
    return [{

        type: "TODO_CLEAR",

    }, search("")]
}