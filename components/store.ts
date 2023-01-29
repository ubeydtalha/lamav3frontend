import { configureStore, ThunkAction, Action  } from '@reduxjs/toolkit'

import {userSlice} from '@/slices/userSlice'
import {systemSlice} from '@/slices/systemSlice'


// const persistedState = localStorage.getItem('reduxState') ?
//    JSON.parse(localStorage.getItem('reduxState')) :
//    {}

export const store = configureStore({
    reducer: {
      user: userReducer,
      system: systemReducer,
        
    },
    // preloadedState:persistedState,
  })

// store.subscribe(()=>{
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
//   })
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch