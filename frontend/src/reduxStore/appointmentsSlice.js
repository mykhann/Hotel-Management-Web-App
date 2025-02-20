import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: [],
        singleAppointment: null,
        doctorAppointments: [],
        appointmentsAdmin: [],
    },
    reducers: {
        setAppointments: (state, action) => {
            state.appointments = action.payload;
        },
        setSingleAppointment: (state, action) => {
            state.singleAppointment = action.payload;
        },
        setDoctorAppointments: (state, action) => {
            state.doctorAppointments = action.payload;
        },
        setAppointmentsAdmin: (state, action) => {
            state.appointmentsAdmin = action.payload;
        },
    },
});

export default appointmentsSlice.reducer;
export const { setAppointments, setSingleAppointment, setDoctorAppointments, setAppointmentsAdmin } = appointmentsSlice.actions;
