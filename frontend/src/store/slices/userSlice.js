import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        profile: null,
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.profile = null;
        }
    },
});

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
