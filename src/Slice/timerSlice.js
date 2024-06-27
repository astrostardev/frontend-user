import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        isRunning: false
    },
    reducers: {
        setIsRunning: (state, action) => {
            state.isRunning = action.payload;
        }
    }
});

export const { setIsRunning } = timerSlice.actions;
export default timerSlice.reducer;
