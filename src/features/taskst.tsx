import {createSlice} from "@reduxjs/toolkit";

const initialstatevalue={id:0,taskuuid:"",title:"",description:"",status:""};

const taskSlice=createSlice({
    name:"taskst",
    initialState:{value:{id:0,taskuuid:"",title:"",description:"",status:""}},
    reducers:{
        taskedit:(state,action)=>{
            
            state.value=action.payload
        },
        logout:(state)=>{
            state.value=initialstatevalue;
        }
    }

})

export const {taskedit,logout}= taskSlice.actions;

export default taskSlice.reducer;