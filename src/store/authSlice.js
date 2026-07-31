import { createSlice } from '@reduxjs/toolkit'
import { LogIn } from 'lucide-react'


const initialState = {
    user: null,
    isLoggedIn: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true
            // state.status = true;
            state.userData = action.payload.userData
        },

        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            // state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer; //Might change later