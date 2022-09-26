import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: 'user',
    initialState: {value: 0},
    reducers: {
        up:(state, action) => {
            state.value = state.value + action.payload;
        }
    }
});

export default user;
export const {up} = user.actions;