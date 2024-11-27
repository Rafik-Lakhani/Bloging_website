import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userdata:null,
    status:false,
}
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.userdata=action.payload;
            state.status=true;
        },
        logout:(state)=>{
            state.userdata=null;
            state.status=false;
        }
    }
});


export const {login,logout} =userSlice.actions
export default userSlice.reducer;
