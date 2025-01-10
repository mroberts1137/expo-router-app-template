import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  darkMode: boolean;
  sfxEnabled: boolean;
  hapticsEnabled: boolean;
}

const initialState: SettingsState = {
  darkMode: false,
  sfxEnabled: true,
  hapticsEnabled: false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleSfx: (state) => {
      state.sfxEnabled = !state.sfxEnabled;
    },
    toggleHaptics: (state) => {
      state.hapticsEnabled = !state.hapticsEnabled;
    },
    resetSettings: () => initialState
  }
});

export const { setDarkMode, toggleSfx, toggleHaptics, resetSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
