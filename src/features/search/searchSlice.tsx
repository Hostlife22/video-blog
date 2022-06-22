import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState } from './search.interface';

const initialState: ISearchState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },

    resetValue: (state) => {
      state.value = '';
    },
  },
});

export const { changeSearchValue, resetValue } = searchSlice.actions;

export default searchSlice.reducer;
