import { createSlice } from "@reduxjs/toolkit";

const myListStorage = JSON.parse(localStorage.getItem('watchLater'));

const localStorageReducer = createSlice({
    name: 'localStorage',
    initialState: {
        value: myListStorage || []
    },
    reducers: {
        addToWatchLater: (state, action) => {
            console.log({...action.payload.data, type: action.payload.type})

            const myListStorage = JSON.parse(localStorage.getItem('watchLater')) || [];

            const updatedArray = [
                ...myListStorage,
                { ...action.payload.data, type: action.payload.type }
            ];

            const unique = updatedArray.reduce((accum, current) => {
                if (!accum.some(item => item.id === current.id)) {
                    accum.push(current);
                }
                return accum;
            }, []); // Remove duplicates

            localStorage.setItem('watchLater', JSON.stringify(unique));
            state.value = unique;
        },
        removeToWatchLater: (state, action) => {
            const myListStorage = JSON.parse(localStorage.getItem('watchLater'));

            const array = myListStorage
            const updatedArray = array.filter(movie => movie.id !== action.payload.id && movie.name !== action.payload.name)

            localStorage.setItem('watchLater', JSON.stringify(updatedArray));
            state.value = updatedArray;
        },
        removeAllWatchList: (state, action) => {
            localStorage.removeItem("watchLater");
            state.value = [];
        }
    }
})
export const {  addToWatchLater, removeAllWatchList, removeToWatchLater } = localStorageReducer.actions;
export default localStorageReducer.reducer;
