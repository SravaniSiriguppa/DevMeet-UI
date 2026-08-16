import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import navbarReducer from "./navbarSlice"
import connectionReducer from "./connectionsSlice"
import requestsReducer from "./requestsSlice"

const store = configureStore(
{
    reducer: {
        user: userReducer,
        feed: feedReducer,
        navbar: navbarReducer,
        connections: connectionReducer,
        requests: requestsReducer
    },
})

export default store;