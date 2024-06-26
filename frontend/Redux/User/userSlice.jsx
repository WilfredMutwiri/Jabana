import {createSlice} from '@reduxjs/toolkit';
const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        signInSuccess:(state,action)=>{
            state.loading=false,
            state.error=null,
            state.currentUser=action.payload
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        // adding teacher reducers
        addTeacherStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        addTeacherSuccess:(state,action)=>{
            state.loading=false,
            state.error=null,
            state.currentTeacher=action.payload
        },
        addTeacherFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }
    }
})

export const{
    signInStart,
    signInSuccess,
    signInFailure,
    addTeacherStart,
    addTeacherSuccess,
    addTeacherFailure
}=userSlice.actions;

export default userSlice.reducer;