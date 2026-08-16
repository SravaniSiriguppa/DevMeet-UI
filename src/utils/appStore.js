import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import navbarReducer from "./navbarSlice"
import connectionReducer from "./connectionsSlice"

const store = configureStore(
{
    reducer: {
        user: userReducer,
        feed: feedReducer,
        navbar: navbarReducer,
        connections: connectionReducer
    },
})

export default store;