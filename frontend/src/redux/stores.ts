import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import FlashSlice from './slices/FlashSlice'

const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        flash:FlashSlice.reducer
    }
})

export default store