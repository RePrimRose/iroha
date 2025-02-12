import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalProgress: null,
    currProgress: 0,
};

const testProgressSlice = createSlice({
    name: "testProgress",
    initialState,
    reducers: {
        setTotalProgress: (state, action) => {
            state.totalProgress = action.payload;
        },
        setCurrProgress: (state, action) => {
            state.currProgress = action.payload;
        },
    },
});

export const { setTotalProgress, setCurrProgress } = testProgressSlice.actions;
export default testProgressSlice.reducer;