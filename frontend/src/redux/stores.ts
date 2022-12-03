import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import FlashSlice from './slices/FlashSlice'
import AlbumsSlice from './slices/AlbumsSlice'
import AlbumSlice from './slices/AlbumSlice'
import CartSlice from './slices/CartSlice'
import TransactionSlice from './slices/TransactionSlice'
import ReviewSlice from './slices/ReviewSlice'
import BlogSlice from './slices/BlogSlice'
import BlogsSlice from './slices/BlogsSlice'
import ArtistsSlice from './slices/ArtistsSlice'
import ReviewsSlice from './slices/ReviewsSlice'

const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        flash:FlashSlice.reducer,
        albums:AlbumsSlice.reducer,
        album:AlbumSlice.reducer,
        cart:CartSlice.reducer,
        transaction:TransactionSlice.reducer,
        review:ReviewSlice.reducer,
        blog:BlogSlice.reducer,
        blogs:BlogsSlice.reducer,
        artists:ArtistsSlice.reducer,
        reviews:ReviewsSlice.reducer,
    }
})

export default store