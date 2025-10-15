import { createSlice } from '@reduxjs/toolkit';

export type DisplayMode = 'grid' | 'list';

interface DisplayState {
  mode: DisplayMode;
}

const initialState: DisplayState = {
  mode: 'list',
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
    toggleMode(state) {
      state.mode = state.mode === 'list' ? 'grid' : 'list';
    },
  },
});

export const { setMode, toggleMode } = displaySlice.actions;
export default displaySlice.reducer;
