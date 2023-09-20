import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todo/todoSlice'
import authReducer from "../features/auth/authSlice"
import { rtkApi } from "../features/rtkquery";
export const store = configureStore({
  reducer: {
    [rtkApi.reducerPath]: rtkApi.reducer,
    todo: todoReducer,
    auth: authReducer
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
