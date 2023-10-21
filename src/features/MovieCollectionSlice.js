import { createSlice } from "@reduxjs/toolkit";

export const movieCollectionReducer = createSlice({
    name: "movieCollectionReducer",
    initialState: {
        genre: "",
        type: "",
        page: 1
    },
    reducers: {
        updateGenre: (state, action) => {
            console.log(action.payload.genre);
            state.genre = action.payload.genre
            state.type = action.payload.type
        }
    }
})
export const {  updateGenre } = movieCollectionReducer.actions;
export default movieCollectionReducer.reducer;
