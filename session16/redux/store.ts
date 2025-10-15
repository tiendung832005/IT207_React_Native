import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './displaySlice';
import accountsReducer from './accountsSlice';
import languageReducer from './languageSlice';
import authReducer from './authSlice';
import positionsReducer from './positionsSlice';
import positionDetailReducer from './positionDetailSlice';
import addPositionReducer from './addPositionSlice';

const store = configureStore({
  reducer: {
    display: displayReducer,
    accounts: accountsReducer,
    language: languageReducer,
    auth: authReducer,
    positions: positionsReducer,
    positionDetail: positionDetailReducer,
    addPosition: addPositionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
