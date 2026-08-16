import {createSlice} from "@reduxjs/toolkit"

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        isProfileSaved: false,
    },
    reducers: {
        isProfileSaved: (state, action) => {
            state.isProfileSaved = action.payload
        }
    }
})

export const {isProfileSaved} = navbarSlice.actions
export default navbarSlice.reducer