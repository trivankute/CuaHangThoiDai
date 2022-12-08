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
import ReviewsSlice from './slices/ReviewsSlice'
import CustomersSlice from './slices/CustomersSlice'
import EmployeesSlice from './slices/EmployeesSlice'
import ArtistsSlice from './slices/ArtistsSlice'
import ServiceSlice from './slices/ServiceSlice'
import SellSlice from './slices/SellSlice'
import FooterSlice from './slices/FooterSlice'
import CarouselSlice from './slices/CarouselSlice'
import MusicSlice from './slices/MusicSlice'
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
        reviews:ReviewsSlice.reducer,
        customers:CustomersSlice.reducer,
        employees:EmployeesSlice.reducer,
        service:ServiceSlice.reducer,
        sell:SellSlice.reducer,
        footer:FooterSlice.reducer,
        carousel:CarouselSlice.reducer,
        music:MusicSlice.reducer
    }
})

export default store