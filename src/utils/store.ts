import { 
    configureStore 
}               from '@reduxjs/toolkit';

import defSlice from '@/reducers/defSlice';

const store = configureStore({
  reducer: {
    default: defSlice,
  }
})

export default store;