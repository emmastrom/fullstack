import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlicer.actions
export default notificationSlicer.reducer