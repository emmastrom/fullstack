import { createSlice } from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        }
    }
})

export const { showNotification, removeNotification } = notificationSlicer.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(showNotification(''))
        }, time*1000)
    }
}

export default notificationSlicer.reducer