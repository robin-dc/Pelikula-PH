import { createSlice } from "@reduxjs/toolkit";
import { auth, fetchData } from "../config/firebase";


const fireStoreReducer = createSlice({
    name: 'fireStore',
    initialState: {
        value: []
    },
    reducers: {
        setList: (state, action) => {
            const data = action.payload
            const filteredData = data.filter(movie => movie.author.id === auth.currentUser.uid)
            state.value = filteredData
        }
    }
})
export const { setList, removeAllWatchList, removeToWatchLater } = fireStoreReducer.actions;
export default fireStoreReducer.reducer;
