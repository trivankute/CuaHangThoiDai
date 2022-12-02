import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import FlashSlice from './slices/FlashSlice'
import AlbumsSlice from './slices/AlbumsSlice'
import AlbumSlice from './slices/AlbumSlice'
import CartSlice from './slices/CartSlice'
import TransactionSlice from './slices/TransactionSlice'
import ReviewSlice from './slices/ReviewSlice'

const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        flash:FlashSlice.reducer,
        albums:AlbumsSlice.reducer,
        album:AlbumSlice.reducer,
        cart:CartSlice.reducer,
        transaction:TransactionSlice.reducer,
        review:ReviewSlice.reducer,
    }
})

export default store