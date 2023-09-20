import { createSlice } from "@reduxjs/toolkit"

import * as thunkAction from "./todoThunk"

import * as Interfaces from "./todoInterface"
import { getMatcher } from "../utils"

const validActions = ["list"]

const initialState: Interfaces.TodoState = {

  list: [],
  isLoading: true,
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkAction.search.fulfilled, (state, action) => {
        state.list = action.payload.data

      }).addCase(thunkAction.add.fulfilled, (state, action) => {

        const todo = action.payload.data
        state.list = [...state.list, action.payload.data]

      }).addCase(thunkAction.markAsDone.fulfilled, (state, action) => {
        const todo = action.payload.data
        state.list = state.list.map((e) => (e.id === todo.id ? todo : e))
      }).addCase(thunkAction.markAsPending.fulfilled, (state, action) => {
        const todo = action.payload.data
        state.list = state.list.map((e) => (e.id === todo.id ? todo : e))
      })
      .addCase(thunkAction.remove.fulfilled, (state, action) => {
        const todo = action.payload.data
        state.list = state.list.filter((e) => e.id !== todo.id ? todo : e)
      })
      .addMatcher(
        getMatcher(validActions, ["fulfilled", "rejected"]),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(getMatcher(validActions, ["pending"]), (state) => {
        state.isLoading = true;
      });

  },
})

export const todoAction = thunkAction
export const todoSelector = (state: { todo: Interfaces.TodoState }) => state.todo
export default todoSlice.reducer