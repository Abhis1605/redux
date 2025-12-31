import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habit-slice"

const store =  configureStore ({
    reducer: {
        habits: habitsReducer
    }
})

// we have to export types from our store when using typescript
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch
// dispatch is the function which allows to tigger action's from store 

export default store;