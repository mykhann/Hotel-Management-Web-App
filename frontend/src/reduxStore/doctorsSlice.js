import { createSlice } from "@reduxjs/toolkit";

const doctorSlice=createSlice({
    name:"doctor",
    initialState:{
        doctors:[],
        singleDoctor:null,
        doctorAppointments:[]
    },
    reducers:{
        setDoctors:(state,action)=>{
            state.doctors = Array.isArray(action.payload) ? action.payload : [];
        } ,
        setSingleDoctor:(state,action)=>{
            state.singleDoctor=action.payload
        },
        setDoctorAppointments:(state,action)=>{
            state.doctorAppointments=action.payload
        }
    }
})

export default doctorSlice.reducer
export const {setDoctors,setSingleDoctor,setDoctorAppointments}=doctorSlice.actions