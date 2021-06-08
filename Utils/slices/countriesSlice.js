import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    country: null,
    mostInfected: null,
    cases: false,
    choose: "cases",
}

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, country: action.payload}
        },
        setCases: (state, action) => {
            return {...state, cases: action.payload}
        },
        setChoose: (state, action) => {
            return {...state, choose: action.payload}
        }
    }
});

export const {
    setData, setCases, setChoose
} = countriesSlice.actions
export default countriesSlice.reducer