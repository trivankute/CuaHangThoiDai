import {configureStore} from '@reduxjs/toolkit'

import UserSlice from './slices/UserSlice'
import FlashSlice from './slices/FlashSlice'
import AlbumsSlice from './slices/AlbumsSlice'
import AlbumSlice from './slices/AlbumSlice'
import CartSlice from './slices/CartSlice'
import TransactionSlice from './slices/TransactionSlice'
import TransactionsSlice from './slices/TransactionsSlice'
import ReviewSlice from './slices/ReviewSlice'
import BlogSlice from './slices/BlogSlice'
import BlogsSlice from './slices/BlogsSlice'
import CustomersSlice from './slices/CustomersSlice'
import EmployeesSlice from './slices/EmployeesSlice'
import ArtistsSlice from './slices/ArtistsSlice'

const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        flash:FlashSlice.reducer,
        albums:AlbumsSlice.reducer,
        album:AlbumSlice.reducer,
        cart:CartSlice.reducer,
        transaction:TransactionSlice.reducer,
        transactions:TransactionsSlice.reducer,
        review:ReviewSlice.reducer,
        blog:BlogSlice.reducer,
        blogs:BlogsSlice.reducer,
        artists:ArtistsSlice.reducer,
        customers:CustomersSlice.reducer,
        employees:EmployeesSlice.reducer,
    }
})

export default store