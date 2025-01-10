import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    lastAppAccessDate: null
  },
  reducers: {
    setLastAppAccessDate: (state, action) => {
      state.lastAppAccessDate = action.payload;
    }
  }
});

export const { setLastAppAccessDate } = dateSlice.actions;
export default dateSlice.reducer;
