import { createSlice } from '@reduxjs/toolkit';

export type Language = 'en' | 'vi';

interface LanguageState {
  lang: Language;
}

const initialState: LanguageState = {
  lang: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage(state) {
      state.lang = state.lang === 'en' ? 'vi' : 'en';
    },
    setLanguage(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
