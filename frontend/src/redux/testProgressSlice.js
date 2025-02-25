import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    progressByType: {},
};

const testProgressSlice = createSlice({
    name: "testProgress",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            const { type, total, current } = action.payload;
            if (!state.progressByType[type]) state.progressByType[type] = { total: 0, current: 0};
            if (total !== undefined) state.progressByType[type].total = total;
            if (current !== undefined) state.progressByType[type].current = current;
        },
        resetProgress: (state, action) => {
            const { type } = action.payload;
            if (type) delete state.progressByType[type];
            else state.progressByType = {};
        }
    },
});

export const { setProgress, resetProgress } = testProgressSlice.actions;
export default testProgressSlice.reducer;