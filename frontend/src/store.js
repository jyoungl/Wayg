import { configureStore } from '@reduxjs/toolkit';
import user from './user';

const store = configureStore({
  reducer: {
    counter: user.reducer
  }
});

export default store;