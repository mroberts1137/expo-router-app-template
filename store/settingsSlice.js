import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  sfxEnabled: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleSfx: (state) => {
      state.quizSettings.sfxEnabled = !state.sfxEnabled;
    },
    resetSettings: () => initialState
  }
});

export const { setDarkMode, toggleSfx, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
