import {configureStore} from "@reduxjs/toolkit";
import authenticationSlice from "./redux/authenticationSlice";
import testProgressSlice from "./redux/testProgressSlice";

const store = configureStore({
    reducer: {
        authentication: authenticationSlice,
        testProgress: testProgressSlice,
    },
});

export default store;